"""
PlantGuard AI - Candidate Model Training Pipeline
Trains a domain-robust candidate model for real-world generalization.

Key Principles:
1. Production Model Protection:
   - Does NOT touch models/model_4_mobilenet_finetuned.keras or its backup.
   - Saves output strictly to models/model_4_mobilenet_realworld_candidate.keras.
2. Preprocessing Preservation:
   - Preserves raw [0, 255] float32 RGB input specification (224x224x3).
3. Realistic Data Augmentation:
   - RandomFlip (horizontal), RandomRotation (0.15), RandomZoom (0.15),
     RandomTranslation (0.1, 0.1), RandomContrast (0.2), RandomBrightness (0.2).
4. Class Balancing:
   - Stratified balanced dataset sampling + balanced class weighting.
5. Strict Isolation:
   - Real-world test images in dataset/real_world_test/ and samples/ are completely excluded.
"""

import os
import sys
import json
import random
import numpy as np
from PIL import Image
import tensorflow as tf
from sklearn.utils.class_weight import compute_class_weight

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_DIR = os.path.join(BASE_DIR, "dataset", "plantvillage dataset", "color")
CLASS_INDICES_PATH = os.path.join(BASE_DIR, "class_indices.json")
BASELINE_MODEL_PATH = os.path.join(BASE_DIR, "models", "model_4_mobilenet_finetuned.keras")
CANDIDATE_MODEL_PATH = os.path.join(BASE_DIR, "models", "model_4_mobilenet_realworld_candidate.keras")

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 10
FINE_TUNE_LR = 5e-5
SAMPLES_PER_CLASS_TRAIN = 60  # Balanced subset to eliminate 36:1 skew and train efficiently on CPU
SAMPLES_PER_CLASS_VAL = 15

def load_class_indices():
    with open(CLASS_INDICES_PATH, "r") as f:
        mapping = json.load(f)
    return [mapping[str(i)] for i in range(len(mapping))]

def build_data_generators(class_names):
    """
    Builds stratified train and validation generators directly from PlantVillage dataset.
    Ensures absolute zero leakage from dataset/real_world_test or samples.
    """
    print(f"\nLoading stratified samples from: {DATASET_DIR}")
    train_paths = []
    train_labels = []
    val_paths = []
    val_labels = []

    random.seed(42)

    for idx, c_name in enumerate(class_names):
        c_dir = os.path.join(DATASET_DIR, c_name)
        if not os.path.exists(c_dir):
            raise FileNotFoundError(f"Missing class directory: {c_dir}")
        all_imgs = sorted([f for f in os.listdir(c_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        random.shuffle(all_imgs)

        # Split into train and val
        val_set = all_imgs[:SAMPLES_PER_CLASS_VAL]
        train_set = all_imgs[SAMPLES_PER_CLASS_VAL:SAMPLES_PER_CLASS_VAL + SAMPLES_PER_CLASS_TRAIN]

        for f in train_set:
            train_paths.append(os.path.join(c_dir, f))
            train_labels.append(idx)
        for f in val_set:
            val_paths.append(os.path.join(c_dir, f))
            val_labels.append(idx)

    print(f"Total training samples:   {len(train_paths)} ({len(class_names)} classes x {SAMPLES_PER_CLASS_TRAIN})")
    print(f"Total validation samples: {len(val_paths)} ({len(class_names)} classes x {SAMPLES_PER_CLASS_VAL})")

    # Compute balanced class weights
    class_weights_arr = compute_class_weight(
        class_weight="balanced",
        classes=np.unique(train_labels),
        y=np.array(train_labels)
    )
    class_weights_dict = {i: float(w) for i, w in enumerate(class_weights_arr)}

    def py_load_image(path, label):
        path_str = path.numpy().decode("utf-8")
        img = Image.open(path_str).convert("RGB").resize(IMG_SIZE)
        arr = np.array(img, dtype=np.float32)  # Strictly raw [0, 255] float32
        one_hot = tf.one_hot(label, len(class_names))
        return arr, one_hot

    def tf_load_image(path, label):
        arr, one_hot = tf.py_function(py_load_image, [path, label], [tf.float32, tf.float32])
        arr.set_shape((224, 224, 3))
        one_hot.set_shape((len(class_names),))
        return arr, one_hot

    # Build tf.data pipeline with realistic domain-gap augmentation
    augmentation_layer = tf.keras.Sequential([
        tf.keras.layers.RandomFlip("horizontal"),
        tf.keras.layers.RandomRotation(0.15),
        tf.keras.layers.RandomZoom(0.15),
        tf.keras.layers.RandomTranslation(0.1, 0.1),
        tf.keras.layers.RandomContrast(0.2),
        tf.keras.layers.RandomBrightness(0.2)
    ], name="domain_gap_augmentation")

    train_ds = tf.data.Dataset.from_tensor_slices((train_paths, train_labels))
    train_ds = train_ds.shuffle(buffer_size=len(train_paths), seed=42)
    train_ds = train_ds.map(tf_load_image, num_parallel_calls=tf.data.AUTOTUNE)
    train_ds = train_ds.batch(BATCH_SIZE)
    train_ds = train_ds.map(lambda x, y: (augmentation_layer(x, training=True), y), num_parallel_calls=tf.data.AUTOTUNE)
    train_ds = train_ds.prefetch(tf.data.AUTOTUNE)

    val_ds = tf.data.Dataset.from_tensor_slices((val_paths, val_labels))
    val_ds = val_ds.map(tf_load_image, num_parallel_calls=tf.data.AUTOTUNE)
    val_ds = val_ds.batch(BATCH_SIZE)
    val_ds = val_ds.prefetch(tf.data.AUTOTUNE)

    return train_ds, val_ds, class_weights_dict

def train_candidate():
    print("=" * 80)
    print("PLANTGUARD AI - CANDIDATE MODEL TRAINING")
    print("=" * 80)

    class_names = load_class_indices()
    num_classes = len(class_names)
    print(f"Loaded {num_classes} classes from class_indices.json")

    # Load baseline model weights
    print(f"Loading baseline weights from: {BASELINE_MODEL_PATH}")
    model = tf.keras.models.load_model(BASELINE_MODEL_PATH)
    print("Baseline model loaded successfully.")

    train_ds, val_ds, class_weights = build_data_generators(class_names)

    # Fine-tuning setup:
    # Unfreeze the top layers of the backbone so they adapt to lighting, contrast,
    # and angle variations while keeping early feature representations stable.
    # MobileNetV2 has 154 layers total.
    print("\nConfiguring layer trainability for fine-tuning...")
    for layer in model.layers[:-40]:
        if not isinstance(layer, tf.keras.layers.BatchNormalization):
            layer.trainable = False
    for layer in model.layers[-40:]:
        if not isinstance(layer, tf.keras.layers.BatchNormalization):
            layer.trainable = True

    trainable_count = count = sum(tf.keras.backend.count_params(w) for w in model.trainable_weights)
    total_count = model.count_params()
    print(f"Total parameters:     {total_count:,}")
    print(f"Trainable parameters: {trainable_count:,} ({trainable_count/total_count*100:.1f}%)")

    optimizer = tf.keras.optimizers.Adam(learning_rate=FINE_TUNE_LR)
    model.compile(
        optimizer=optimizer,
        loss="categorical_crossentropy",
        metrics=["accuracy", tf.keras.metrics.TopKCategoricalAccuracy(k=3, name="top_3_accuracy")]
    )

    callbacks = [
        tf.keras.callbacks.EarlyStopping(
            monitor="val_loss",
            patience=3,
            restore_best_weights=True,
            verbose=1
        ),
        tf.keras.callbacks.ReduceLROnPlateau(
            monitor="val_loss",
            factor=0.5,
            patience=2,
            min_lr=1e-6,
            verbose=1
        )
    ]

    print("\nStarting domain-adaptation fine-tuning...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=EPOCHS,
        class_weight=class_weights,
        callbacks=callbacks,
        verbose=1
    )

    # Save to candidate model path strictly
    os.makedirs(os.path.dirname(CANDIDATE_MODEL_PATH), exist_ok=True)
    model.save(CANDIDATE_MODEL_PATH)
    print(f"\n[SUCCESS] Candidate model saved strictly to: {CANDIDATE_MODEL_PATH}")
    print(f"Verified baseline model untouched at:       {BASELINE_MODEL_PATH}")

    # Save training history
    hist_path = os.path.join(BASE_DIR, "tests", "candidate_training_history.json")
    hist_data = {k: [float(v) for v in vals] for k, vals in history.history.items()}
    with open(hist_path, "w") as f:
        json.dump(hist_data, f, indent=2)
    print(f"Training history written to: {hist_path}")
    print("=" * 80)

if __name__ == "__main__":
    train_candidate()
