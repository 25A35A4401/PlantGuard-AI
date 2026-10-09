# PlantGuard AI – Plant Disease Detection System

PlantGuard AI is a deep learning web application that identifies 38 different plant disease and health conditions from leaf images. Powered by convolutional neural networks (MobileNetV2 and EfficientNetV2), it provides instant disease diagnosis, confidence metrics, symptoms, root causes, and actionable ecological and chemical treatment plans.

---

## Project Structure

```
plantguard-ai/
├── dataset/                  # Dataset directory containing training and validation images
│   ├── train/                # 38 crop disease classes
│   └── val/                  # Validation splits
├── models/                   # Neural network weights and model checkpoints
│   ├── model_4_mobilenet_finetuned.keras  # Active production MobileNetV2 model
│   └── plantguard_efficientnetv2.keras    # Trained EfficientNetV2 model
├── samples/                  # Demo and test input leaf images
│   ├── grape_black_rot.png
│   ├── tomato_early_blight_leaf.png
│   └── tomato_early_blight_leaf_masked.png
├── static/                   # Static frontend assets
│   ├── index.css             # Glassmorphism UI styles
│   └── index.js              # Interactive UI, scanning animation & disease library
├── templates/                # Jinja2 HTML templates
│   └── index.html            # Main web interface
├── tests/                    # Automated testing suite
│   └── test_model.py         # Verification script for model architecture and loading
├── .gitignore                # Git ignore rules for Python, cache, and OS files
├── app.py                    # Flask application server and prediction API
├── disease_database.py       # Knowledge base containing symptoms, causes & treatments
├── requirements.txt          # Python dependencies
└── train.py                  # Model training and fine-tuning pipeline
```

---

## Getting Started

### 1. Requirements
- Python 3.10 or 3.11 (TensorFlow 2.15+ compatible)
- Pip

### 2. Installation
Install the required dependencies:
```bash
pip install -r requirements.txt
```

### 3. Run the Web Application
Start the Flask development server:
```bash
python app.py
```
Open your browser and navigate to:
```
http://127.0.0.1:5000
```

### 4. Run Model Diagnostics
To verify that the model loads and inspect the neural network layer summary:
```bash
python tests/test_model.py
```

### 5. Retrain or Fine-Tune Model
To train the EfficientNetV2 architecture on your dataset:
```bash
python train.py
```
Model checkpoints will be automatically saved to `models/plantguard_efficientnetv2.keras`.

---

## Supported Crops & Diseases (38 Classes)
The model diagnoses health and disease conditions across:
- **Apple**: Apple Scab, Black Rot, Cedar Apple Rust, Healthy
- **Blueberry**: Healthy
- **Cherry**: Powdery Mildew, Healthy
- **Corn (Maize)**: Cercospora / Gray Leaf Spot, Common Rust, Northern Leaf Blight, Healthy
- **Grape**: Black Rot, Esca (Black Measles), Leaf Blight, Healthy
- **Orange**: Citrus Greening (Huanglongbing)
- **Peach**: Bacterial Spot, Healthy
- **Bell Pepper**: Bacterial Spot, Healthy
- **Potato**: Early Blight, Late Blight, Healthy
- **Raspberry**: Healthy
- **Soybean**: Healthy
- **Squash**: Powdery Mildew
- **Strawberry**: Leaf Scorch, Healthy
- **Tomato**: Bacterial Spot, Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Yellow Leaf Curl Virus, Mosaic Virus, Healthy
