"""
Evaluation Suite for PlantGuard AI Models
Computes Top-1, Top-3, Precision, Recall, Macro/Weighted F1,
Per-Class breakdown, Isolated Real-World Test Set evaluation,
and Tomato Early Blight diagnostic case testing.
"""

import os
import sys
import json
import argparse
import numpy as np
from PIL import Image
import tensorflow as tf
from sklearn.metrics import classification_report, confusion_matrix, precision_recall_fscore_support, accuracy_score

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load_class_mapping():
    mapping_path = os.path.join(BASE_DIR, "class_indices.json")
    if not os.path.exists(mapping_path):
        raise FileNotFoundError(f"class_indices.json not found at {mapping_path}")
    with open(mapping_path, "r") as f:
        mapping = json.load(f)
    class_names = [mapping[str(i)] for i in range(len(mapping))]
    return class_names

def predict_batch(model, image_paths, batch_size=32):
    """Batches image loading and model prediction for fast CPU inference."""
    all_preds = []
    for i in range(0, len(image_paths), batch_size):
        batch_paths = image_paths[i:i + batch_size]
        batch_imgs = []
        for p in batch_paths:
            img = Image.open(p).convert("RGB").resize((224, 224))
            batch_imgs.append(np.array(img, dtype=np.float32))
        batch_arr = np.stack(batch_imgs, axis=0)
        preds = model.predict(batch_arr, verbose=0)
        all_preds.append(preds)
    if all_preds:
        return np.concatenate(all_preds, axis=0)
    return np.empty((0, 38))

def evaluate(model_path=None, samples_per_class=10, include_training_eval=True, report_name="evaluation_report.json"):
    if model_path is None:
        model_path = os.path.join(BASE_DIR, "models", "model_4_mobilenet_finetuned.keras")
    
    print("=" * 80)
    print("PLANTGUARD AI - MODEL EVALUATION SUITE")
    print(f"Evaluating Model: {model_path}")
    print("=" * 80)

    class_names = load_class_mapping()
    num_classes = len(class_names)
    class_to_idx = {name: i for i, name in enumerate(class_names)}
    print(f"Loaded {num_classes} classes from class_indices.json\n")

    print(f"Loading Keras model from {model_path}...")
    model = tf.keras.models.load_model(model_path)
    print("Model successfully loaded into memory.\n")

    dataset_base = os.path.join(BASE_DIR, "dataset", "plantvillage dataset", "color")
    if not os.path.exists(dataset_base):
        raise FileNotFoundError(f"Dataset directory not found: {dataset_base}")

    results = {"model_path": model_path}

    # -------------------------------------------------------------
    # 1. EVALUATE STRATIFIED VALIDATION SPLIT
    # -------------------------------------------------------------
    print(f"--- 1. Evaluating Stratified Validation Split ({samples_per_class} samples/class) ---")
    val_y_true = []
    val_image_paths = []

    for idx, c_name in enumerate(class_names):
        c_dir = os.path.join(dataset_base, c_name)
        if not os.path.exists(c_dir):
            continue
        all_files = sorted([f for f in os.listdir(c_dir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])
        val_files = all_files[-samples_per_class:]
        for f in val_files:
            val_image_paths.append(os.path.join(c_dir, f))
            val_y_true.append(idx)

    val_preds = predict_batch(model, val_image_paths, batch_size=32)
    val_y_pred = np.argmax(val_preds, axis=1)

    val_top3_hits = []
    val_confs = []
    val_margins = []

    for i in range(len(val_y_true)):
        top_indices = np.argsort(val_preds[i])[::-1]
        top1 = top_indices[0]
        top3 = top_indices[:3]
        conf1 = float(val_preds[i][top1])
        conf2 = float(val_preds[i][top_indices[1]])
        margin = (conf1 - conf2) * 100.0

        val_top3_hits.append(val_y_true[i] in top3)
        val_confs.append(conf1 * 100.0)
        val_margins.append(margin)

    val_acc = accuracy_score(val_y_true, val_y_pred) * 100.0
    val_top3_acc = np.mean(val_top3_hits) * 100.0
    precision, recall, f1_macro, _ = precision_recall_fscore_support(val_y_true, val_y_pred, average='macro', zero_division=0)
    _, _, f1_weighted, _ = precision_recall_fscore_support(val_y_true, val_y_pred, average='weighted', zero_division=0)

    correct_mask = np.array(val_y_true) == np.array(val_y_pred)
    mean_conf_correct = np.mean(np.array(val_confs)[correct_mask]) if np.any(correct_mask) else 0.0
    mean_conf_incorrect = np.mean(np.array(val_confs)[~correct_mask]) if np.any(~correct_mask) else 0.0

    print(f"\n[Validation Results]")
    print(f"  Total Samples Evaluated: {len(val_y_true)}")
    print(f"  Top-1 Accuracy:          {val_acc:.2f}%")
    print(f"  Top-3 Accuracy:          {val_top3_acc:.2f}%")
    print(f"  Macro Precision:         {precision*100.0:.2f}%")
    print(f"  Macro Recall:            {recall*100.0:.2f}%")
    print(f"  Macro F1-Score:          {f1_macro*100.0:.2f}%")
    print(f"  Weighted F1-Score:       {f1_weighted*100.0:.2f}%")
    print(f"  Mean Conf (Correct):     {mean_conf_correct:.2f}%")
    print(f"  Mean Conf (Incorrect):   {mean_conf_incorrect:.2f}%\n")

    results["validation"] = {
        "samples_evaluated": len(val_y_true),
        "top1_accuracy": round(val_acc, 2),
        "top3_accuracy": round(val_top3_acc, 2),
        "macro_precision": round(precision * 100.0, 2),
        "macro_recall": round(recall * 100.0, 2),
        "macro_f1": round(f1_macro * 100.0, 2),
        "weighted_f1": round(f1_weighted * 100.0, 2),
        "mean_conf_correct": round(mean_conf_correct, 2),
        "mean_conf_incorrect": round(mean_conf_incorrect, 2)
    }

    # Per-class metrics
    p_per_class, r_per_class, f1_per_class, _ = precision_recall_fscore_support(val_y_true, val_y_pred, average=None, zero_division=0)
    per_class_summary = {}
    for idx, c_name in enumerate(class_names):
        per_class_summary[c_name] = {
            "precision": round(p_per_class[idx] * 100.0, 2),
            "recall": round(r_per_class[idx] * 100.0, 2),
            "f1": round(f1_per_class[idx] * 100.0, 2)
        }
    results["per_class_validation"] = per_class_summary

    # -------------------------------------------------------------
    # 2. EVALUATE ISOLATED REAL-WORLD TEST SET (dataset/real_world_test)
    # -------------------------------------------------------------
    rw_dir = os.path.join(BASE_DIR, "dataset", "real_world_test")
    print(f"--- 2. Evaluating Isolated Real-World Test Set ({rw_dir}) ---")
    rw_results = {}
    if os.path.exists(rw_dir):
        rw_image_paths = []
        rw_y_true = []
        rw_class_names = []
        rw_files = []

        for c_folder in sorted(os.listdir(rw_dir)):
            c_path = os.path.join(rw_dir, c_folder)
            if os.path.isdir(c_path) and c_folder in class_to_idx:
                c_idx = class_to_idx[c_folder]
                for f in sorted(os.listdir(c_path)):
                    if f.lower().endswith(('.jpg', '.jpeg', '.png')):
                        rw_image_paths.append(os.path.join(c_path, f))
                        rw_y_true.append(c_idx)
                        rw_class_names.append(c_folder)
                        rw_files.append(f)

        if rw_image_paths:
            rw_preds = predict_batch(model, rw_image_paths, batch_size=16)
            rw_y_pred = np.argmax(rw_preds, axis=1)

            rw_top3_hits = []
            rw_confs = []
            rw_details = []

            # Per-class aggregation
            class_stats = {}

            for i in range(len(rw_y_true)):
                top_indices = np.argsort(rw_preds[i])[::-1]
                top1 = top_indices[0]
                top3 = top_indices[:3]
                conf1 = float(rw_preds[i][top1]) * 100.0
                conf2 = float(rw_preds[i][top_indices[1]]) * 100.0
                margin = conf1 - conf2

                is_top1 = (top1 == rw_y_true[i])
                is_top3 = (rw_y_true[i] in top3)
                rw_top3_hits.append(is_top3)
                rw_confs.append(conf1)

                c_name = rw_class_names[i]
                if c_name not in class_stats:
                    class_stats[c_name] = {"count": 0, "correct_top1": 0, "correct_top3": 0}
                class_stats[c_name]["count"] += 1
                if is_top1:
                    class_stats[c_name]["correct_top1"] += 1
                if is_top3:
                    class_stats[c_name]["correct_top3"] += 1

                rw_details.append({
                    "file": rw_files[i],
                    "true_class": c_name,
                    "pred_class": class_names[top1],
                    "is_top1_correct": bool(is_top1),
                    "is_top3_correct": bool(is_top3),
                    "confidence": round(conf1, 2),
                    "margin": round(margin, 2),
                    "top3": [
                        {"rank": r + 1, "class": class_names[top_indices[r]], "conf": round(float(rw_preds[i][top_indices[r]]) * 100.0, 2)}
                        for r in range(3)
                    ]
                })

            overall_rw_top1 = accuracy_score(rw_y_true, rw_y_pred) * 100.0
            overall_rw_top3 = np.mean(rw_top3_hits) * 100.0

            print(f"\n[Real-World Test Set Summary]")
            print(f"  Total Real-World Images: {len(rw_y_true)}")
            print(f"  Overall Top-1 Accuracy:  {overall_rw_top1:.2f}% ({np.sum(np.array(rw_y_true) == rw_y_pred)}/{len(rw_y_true)})")
            print(f"  Overall Top-3 Accuracy:  {overall_rw_top3:.2f}% ({np.sum(rw_top3_hits)}/{len(rw_y_true)})\n")

            print(f"{'Disease/Class':<45} {'Count':<6} {'Correct':<8} {'Incorrect':<10} {'Top-1 Acc':<10} {'Top-3 Acc':<10}")
            print("-" * 92)
            per_class_rw = {}
            for c_name, stats in sorted(class_stats.items()):
                cnt = stats["count"]
                c_top1 = stats["correct_top1"]
                inc = cnt - c_top1
                top1_acc = (c_top1 / cnt) * 100.0
                top3_acc = (stats["correct_top3"] / cnt) * 100.0
                print(f"{c_name:<45} {cnt:<6d} {c_top1:<8d} {inc:<10d} {top1_acc:8.1f}%  {top3_acc:8.1f}%")
                per_class_rw[c_name] = {
                    "count": cnt,
                    "correct": c_top1,
                    "incorrect": inc,
                    "top1_accuracy": round(top1_acc, 2),
                    "top3_accuracy": round(top3_acc, 2)
                }

            rw_results = {
                "total_images": len(rw_y_true),
                "top1_accuracy": round(overall_rw_top1, 2),
                "top3_accuracy": round(overall_rw_top3, 2),
                "per_class": per_class_rw,
                "details": rw_details
            }
    results["real_world_test"] = rw_results

    # -------------------------------------------------------------
    # 3. TOMATO EARLY BLIGHT SPECIFIC DIAGNOSTIC TEST
    # -------------------------------------------------------------
    print(f"\n--- 3. Specific Tomato Early Blight Diagnostic Cases ---")
    tomato_cases = [
        os.path.join(BASE_DIR, "samples", "tomato_early_blight_leaf.png"),
        os.path.join(BASE_DIR, "samples", "tomato_early_blight_leaf_masked.png")
    ]
    diag_results = []
    for tc_path in tomato_cases:
        if os.path.exists(tc_path):
            img = Image.open(tc_path).convert("RGB").resize((224, 224))
            arr = np.expand_dims(np.array(img, dtype=np.float32), 0)
            preds = model.predict(arr, verbose=0)[0]
            top_indices = np.argsort(preds)[::-1][:3]
            top1_c = class_names[top_indices[0]]
            top1_conf = float(preds[top_indices[0]]) * 100.0
            
            # Find rank and conf of Tomato___Early_blight
            eb_idx = class_to_idx["Tomato___Early_blight"]
            eb_conf = float(preds[eb_idx]) * 100.0
            eb_rank = int(np.where(top_indices == eb_idx)[0][0] + 1) if eb_idx in top_indices else int(np.where(np.argsort(preds)[::-1] == eb_idx)[0][0] + 1)

            fname = os.path.basename(tc_path)
            print(f"  {fname:<38} -> Top-1: {top1_c:<35} ({top1_conf:5.2f}%) | Early Blight Rank: {eb_rank} ({eb_conf:5.2f}%)")
            diag_results.append({
                "file": fname,
                "top1_prediction": top1_c,
                "top1_confidence": round(top1_conf, 2),
                "early_blight_rank": eb_rank,
                "early_blight_confidence": round(eb_conf, 2)
            })
    results["tomato_early_blight_diagnostic"] = diag_results

    # Save full JSON report
    report_path = os.path.join(BASE_DIR, "tests", report_name)
    with open(report_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nEvaluation report successfully written to: {report_path}")
    print("=" * 80)
    return results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Evaluate PlantGuard AI models")
    parser.add_argument("--model", type=str, default=None, help="Path to .keras model file")
    parser.add_argument("--samples", type=int, default=10, help="Validation samples per class")
    parser.add_argument("--report-name", type=str, default="evaluation_report.json", help="Report filename")
    args = parser.parse_args()
    evaluate(model_path=args.model, samples_per_class=args.samples, report_name=args.report_name)
