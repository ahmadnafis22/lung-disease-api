import os

from dotenv import load_dotenv
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import preprocess_input


load_dotenv()

MODEL_PATH = os.getenv(
    "MODEL_PATH"
)


model = load_model(
    MODEL_PATH,
    custom_objects={
        "preprocess_input": preprocess_input
    }
)


def predict_image(image_array):

    prediction = model.predict(
        image_array,
        verbose=0
    )

    probability = float(
        prediction[0][0]
    )

    if probability >= 0.5:

        result = "PNEUMONIA"
        confidence = probability * 100

    else:

        result = "NORMAL"
        confidence = (1 - probability) * 100

    return result, probability, confidence