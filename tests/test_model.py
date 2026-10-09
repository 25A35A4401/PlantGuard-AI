import os
import tensorflow as tf

print("TensorFlow:", tf.__version__)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model_4_mobilenet_finetuned.keras")

try:
    print(f"Loading model from: {MODEL_PATH}")
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully!")
    model.summary()
except Exception as e:
    print(type(e).__name__)
    print(e)