# backend/face_utils.py

import numpy as np
import cv2
from PIL import Image
import io

def preprocess(img_bytes):
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = img.resize((224, 224))
    arr = np.array(img) / 255.0  # Normalize
    return np.expand_dims(arr, axis=0)  # shape: (1, 224, 224, 3)

def stage_and_tip(confidence, diagnosis):
    if diagnosis == "ILD suspected":
        if confidence > 0.9:
            return "Severe", ["Seek immediate pulmonary evaluation.", "Avoid polluted areas."]
        elif confidence > 0.75:
            return "Moderate", ["Regular monitoring", "Use prescribed inhalers."]
        else:
            return "Mild", ["Consult a doctor soon", "Do breathing exercises."]
    else:
        return "", ["No ILD symptoms detected."]
