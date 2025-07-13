import tensorflow as tf

try:
    model = tf.keras.models.load_model("models/ild_face_model.h5")  # ✅ NOT models/...
    print("✅ Model loaded successfully.")
except Exception as e:
    print("❌ Model loading failed:")
    print(e)
