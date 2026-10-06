# 🫁 Lung Disease Detection API

An AI-powered web application for detecting lung diseases from chest X-ray images using a deep learning model.

The project provides a **FastAPI backend** for model inference and a **React frontend** for an interactive user interface.

---

## 🚀 Features

* 🧠 Deep Learning model for lung disease detection
* 🖼️ Upload chest X-ray images
* ⚡ FastAPI REST API for model inference
* 🎨 React + Vite frontend
* 🔄 Backend ↔ Frontend integration using REST API
* 🌐 CORS support
* 📊 Prediction result returned through JSON
* 📝 Logging for backend monitoring

---

## 🏗️ Project Architecture

```text
                    ┌──────────────────┐
                    │   React Frontend │
                    │   Vite + React   │
                    └────────┬─────────┘
                             │
                             │ HTTP Request
                             ▼
                    ┌──────────────────┐
                    │  FastAPI Backend │
                    │      REST API    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Deep Learning    │
                    │      Model       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Prediction Result│
                    └──────────────────┘
```

---

## 📁 Project Structure

```text
lung-disease-api/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── model.py
│   │   ├── preprocessing.py
│   │   └── schemas.py
│   │
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🛠️ Technologies

### Backend

* Python
* FastAPI
* Pydantic
* Uvicorn
* TensorFlow / Keras
* NumPy
* Pillow

### Frontend

* React
* Vite
* JavaScript
* CSS

### Machine Learning

* Deep Learning
* Image Classification
* Chest X-ray Image Processing

---

## ⚙️ Backend Setup

Clone the repository:

```bash
git clone https://github.com/ahmadnafis22/lung-disease-api.git
```

Move into the project:

```bash
cd lung-disease-api
```

Create a virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

---

## ▶️ Run the Backend

From the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

FastAPI automatically provides interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

---

## 🎨 Frontend Setup

Open another terminal and move to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Vite will provide a local URL similar to:

```text
http://localhost:5173
```

---

## 🔌 API

The backend exposes an endpoint for image prediction.

Example request:

```http
POST /predict
```

The endpoint accepts a chest X-ray image and returns the model prediction.

Example response:

```json
{
  "prediction": "Pneumonia",
  "confidence": 0.92
}
```

> The exact response fields depend on the current model/API implementation.

---

## 🧠 Machine Learning Workflow

The general workflow is:

```text
Chest X-ray Image
        ↓
Image Preprocessing
        ↓
Deep Learning Model
        ↓
Prediction
        ↓
Confidence Score
        ↓
FastAPI Response
        ↓
React Interface
```

---

## 🔐 CORS

The FastAPI backend is configured with CORS middleware so that the React frontend can communicate with the API during development.

---

## 📸 Application Preview

Add a screenshot of the application here:

```text
![Lung Disease Detection](./frontend/src/assets/hero.png)
```

---

## 🎯 Project Goals

This project was built to practice and demonstrate:

* Deep Learning
* Computer Vision
* Image Classification
* FastAPI
* REST APIs
* React
* Frontend/Backend integration
* AI Engineering concepts
* Model deployment architecture

---

## 🚧 Future Improvements

* [ ] Deploy the FastAPI backend
* [ ] Deploy the React frontend
* [ ] Add authentication
* [ ] Add prediction history
* [ ] Improve model performance
* [ ] Add more lung disease classes
* [ ] Add model explainability with Grad-CAM
* [ ] Add automated testing
* [ ] Add Docker support
* [ ] Add CI/CD pipeline

---

## ⚠️ Disclaimer

This project is for **educational and research purposes only**.

It is not intended to replace professional medical diagnosis or medical advice.

---

## 👨‍💻 Author

**Ahmad Osama Nafis**

AI Engineer | Machine Learning | Deep Learning | NLP | Computer Vision | Python

---

## ⭐ If you find this project useful

Feel free to ⭐ the repository and explore the project.
