import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.applications import MobileNetV2

model = Sequential([
    MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights=None),
    Flatten(),
    Dense(1, activation='sigmoid')  # Binary classification (ILD or not)
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.save("models/ild_face_model.h5")

print("✅ Dummy model created and saved.")
