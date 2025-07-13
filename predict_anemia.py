import sys
import json

def dummy_predict(image_path):
    # simulate output
    return {
        "diagnosis": "Anemia Detected",
        "confidence": 0.87,
        "stage": "Moderate",
        "tips": [
            "Increase iron intake",
            "Consult a hematologist"
        ]
    }

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = dummy_predict(image_path)
    print(json.dumps(result))
