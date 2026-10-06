import io

import numpy as np
from PIL import Image

def preprocess_image(image_bytes: bytes):

    image = Image.open(
        io.BytesIO(image_bytes)
    )

    image = image.convert("RGB")

    image = image.resize(
        (224, 224)
    )

    image_array = np.array(image)

    image_array = np.expand_dims(
        image_array,
        axis=0
    )

    return image_array