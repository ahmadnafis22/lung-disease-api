import logging

from fastapi import (
    FastAPI,
    HTTPException,
    UploadFile,
    File
)

from fastapi.middleware.cors import CORSMiddleware

from app.schemas import PredictionResponse
from app.preprocessing import preprocess_image
from app.model import model, predict_image


# ==========================================
# Logging
# ==========================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


# ==========================================
# FastAPI
# ==========================================

app = FastAPI(
    title="Lung Disease Detection API",
    description="Chest X-Ray pneumonia prediction API",
    version="1.0.0"
)


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Home
# ==========================================

@app.get("/")
async def home():

    return {
        "message": "Lung Disease API is running 🚀"
    }


# ==========================================
# Health Check
# ==========================================

@app.get("/health")
async def health_check():

    return {
        "status": "healthy",
        "model_loaded": model is not None
    }


# ==========================================
# Prediction
# ==========================================

@app.post(
    "/predict",
    response_model=PredictionResponse
)
async def predict(
    file: UploadFile = File(...)
):

    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/jpg"
    ]

    # Validate file type

    if file.content_type not in allowed_types:

        logger.warning(
            "Invalid file type: %s",
            file.content_type
        )

        raise HTTPException(
            status_code=400,
            detail="Only JPG and PNG images are allowed."
        )


    # Read image

    image_bytes = await file.read()

    logger.info(
        "Received file: %s | size=%d bytes",
        file.filename,
        len(image_bytes)
    )


    # Preprocessing

    try:

        image_array = preprocess_image(
            image_bytes
        )

    except Exception as e:

        logger.error(
            "Image preprocessing failed: %s",
            e
        )

        raise HTTPException(
            status_code=400,
            detail="Invalid or corrupted image file."
        )


    # Prediction

    result, probability, confidence = predict_image(
        image_array
    )


    logger.info(
        "Prediction: %s | confidence=%.2f%%",
        result,
        confidence
    )


    # Response

    return PredictionResponse(
        filename=file.filename,
        prediction=result,
        probability=probability,
        confidence=round(confidence, 2)
    )