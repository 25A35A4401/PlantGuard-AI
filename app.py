import os
from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image

from disease_database import DISEASE_DATABASE

app = Flask(__name__)

# ==========================
# Load Model
# ==========================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "model_4_mobilenet_finetuned.keras")

print(f"Loading MobileNet model: {MODEL_PATH}...")
model = tf.keras.models.load_model(MODEL_PATH)

# ==========================
# Class Names (Loaded from canonical class_indices.json)
# ==========================
CLASS_INDICES_PATH = os.path.join(BASE_DIR, "class_indices.json")
if os.path.exists(CLASS_INDICES_PATH):
    import json
    with open(CLASS_INDICES_PATH, "r") as f:
        mapping = json.load(f)
    class_names = [mapping[str(i)] for i in range(len(mapping))]
    print(f"Loaded {len(class_names)} classes from class_indices.json")
else:
    # Fallback to default alphabetical ordering
    class_names = [
        "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
        "Blueberry___healthy",
        "Cherry_(including_sour)___Powdery_mildew", "Cherry_(including_sour)___healthy",
        "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot", "Corn_(maize)___Common_rust_",
        "Corn_(maize)___Northern_Leaf_Blight", "Corn_(maize)___healthy",
        "Grape___Black_rot", "Grape___Esca_(Black_Measles)", "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)", "Grape___healthy",
        "Orange___Haunglongbing_(Citrus_greening)",
        "Peach___Bacterial_spot", "Peach___healthy",
        "Pepper,_bell___Bacterial_spot", "Pepper,_bell___healthy",
        "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
        "Raspberry___healthy",
        "Soybean___healthy",
        "Squash___Powdery_mildew",
        "Strawberry___Leaf_scorch", "Strawberry___healthy",
        "Tomato___Bacterial_spot", "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___Leaf_Mold",
        "Tomato___Septoria_leaf_spot", "Tomato___Spider_mites Two-spotted_spider_mite", "Tomato___Target_Spot",
        "Tomato___Tomato_Yellow_Leaf_Curl_Virus", "Tomato___Tomato_mosaic_virus", "Tomato___healthy"
    ]

# ==========================
# Home Page
# ==========================
@app.route("/")
def home():
    return render_template("index.html")


# ==========================
# Prediction API
# ==========================
def clean_labels(cls_name):
    parts = cls_name.split("___")
    crop = parts[0].replace("_(including_sour)", "").replace("_(maize)", "").replace(",_bell", "").strip()
    disease = parts[1].rstrip("_").replace("_", " ").strip() if len(parts) > 1 else "Unknown"
    return crop, disease

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]

    # 1. Verified preprocessing for MobileNetV2 production model:
    # - RGB conversion
    # - Resize to (224, 224)
    # - Raw float32 array in [0, 255] range (model was trained on raw pixel values)
    # - Expand batch dimension (1, 224, 224, 3)
    image = Image.open(file).convert("RGB")
    image = image.resize((224, 224))

    img = np.array(image, dtype=np.float32)
    img_batch = np.expand_dims(img, axis=0)

    # Basic image quality / anomaly heuristics
    mean_val = float(np.mean(img))
    std_val = float(np.std(img))
    is_extreme_dark = mean_val < 15.0
    is_extreme_bright = mean_val > 245.0
    is_extreme_flat = std_val < 8.0
    quality_issue = is_extreme_dark or is_extreme_bright or is_extreme_flat

    # 2. Run inference
    prediction = model.predict(img_batch, verbose=0)[0]

    # 3. Extract Top-3 predictions
    top3_idx = np.argsort(prediction)[-3:][::-1]
    top1_idx = top3_idx[0]
    top2_idx = top3_idx[1]
    top3_idx_val = top3_idx[2]

    confidence = round(float(prediction[top1_idx]) * 100, 2)
    confidence_2 = round(float(prediction[top2_idx]) * 100, 2)
    confidence_3 = round(float(prediction[top3_idx_val]) * 100, 2)
    margin = round(confidence - confidence_2, 2)

    predicted_class = class_names[top1_idx]
    crop_cleaned, disease_cleaned = clean_labels(predicted_class)
    c2, d2 = clean_labels(class_names[top2_idx])
    c3, d3 = clean_labels(class_names[top3_idx_val])

    top_predictions = [
        {
            "rank": 1,
            "crop": crop_cleaned,
            "disease": disease_cleaned,
            "class_name": predicted_class,
            "confidence": confidence
        },
        {
            "rank": 2,
            "crop": c2,
            "disease": d2,
            "class_name": class_names[top2_idx],
            "confidence": confidence_2
        },
        {
            "rank": 3,
            "crop": c3,
            "disease": d3,
            "class_name": class_names[top3_idx_val],
            "confidence": confidence_3
        }
    ]

    # 4. Uncertainty & Ambiguity Detection
    # Empirical validation showed incorrect predictions can reach ~88% confidence in PlantVillage studio models.
    # We flag uncertainty if:
    #   - Image has extreme lighting / quality issue
    #   - Top-1 confidence < 85.0%
    #   - Margin between Rank 1 and Rank 2 < 40.0%
    #   - Crop species mismatch between Rank 1 & Rank 2 when Rank 2 has non-negligible probability (>= 5.0%)
    is_uncertain = bool(
        quality_issue or
        (confidence < 85.0) or
        (margin < 40.0) or
        (crop_cleaned != c2 and confidence_2 >= 5.0)
    )

    if quality_issue:
        warning_message = "Image quality warning: Image appears overly dark, washed out, or low contrast. Please upload a well-lit, focused close-up photo of the affected leaf."
    elif is_uncertain:
        warning_message = "Model is uncertain. Please upload a clear, close-up image of the affected leaf."
    else:
        warning_message = None

    # Print Top-3 console diagnostics
    print(f"\n--- Diagnostic Prediction Summary ---")
    print(f"  Rank 1: {predicted_class:<45} | Conf: {confidence:.2f}%")
    print(f"  Rank 2: {class_names[top2_idx]:<45} | Conf: {confidence_2:.2f}%")
    print(f"  Rank 3: {class_names[top3_idx_val]:<45} | Conf: {confidence_3:.2f}%")
    print(f"  Margin: {margin:.2f}% | Uncertain: {is_uncertain}")
    if warning_message:
        print(f"  Warning: {warning_message}")
    print("-------------------------------------\n")

    details = DISEASE_DATABASE.get(predicted_class, {})

    return jsonify({
        "crop": crop_cleaned,
        "disease": disease_cleaned,
        "confidence": confidence,
        "top2_margin": margin,
        "top_predictions": top_predictions,
        "is_uncertain": is_uncertain,
        "warning_message": warning_message,
        "severity": details.get("severity", "Unknown"),
        "description": details.get("description", ""),
        "symptoms": details.get("symptoms", []),
        "cause": details.get("cause", ""),
        "treatment": details.get("treatment", []),
        "prevention": details.get("prevention", [])
    })


# ==========================
# Run Flask
# ==========================
if __name__ == "__main__":
    app.run(debug=True)