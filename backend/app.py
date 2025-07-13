from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)

# Load your model
try:
    face_model = tf.keras.models.load_model("models/ild_face_model.h5")
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Could not load model:", e)

@app.route("/face-predict", methods=["POST"])
def face_predict():
    if "face" not in request.files:
        return jsonify({"error": "No face image uploaded"}), 400

    file = request.files["face"]
    try:
        # Load and preprocess image
        image = Image.open(file.stream).resize((224, 224))  # adjust size as per your model
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        # Predict
        pred = face_model.predict(img_array)
        confidence = float(np.max(pred))
        label_index = int(np.argmax(pred))

        # Map labels (example - change as per your model)
        labels = ["No ILD", "Mild ILD", "Severe ILD"]
        tips_dict = {
            "No ILD": ["Continue healthy habits", "No treatment needed"],
            "Mild ILD": ["Follow-up in 6 months", "Light breathing exercises"],
            "Severe ILD": ["Specialist consultation", "Pulmonary rehab", "CT scan in 3 months"]
        }

        diagnosis = labels[label_index]
        tips = tips_dict[diagnosis]

        return jsonify({
            "diagnosis": diagnosis,
            "confidence": confidence,
            "tips": tips
        })

    except Exception as e:
        print("❌ Prediction error:", e)
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
