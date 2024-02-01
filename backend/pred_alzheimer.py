from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
from PIL import Image
import numpy as np

app = FastAPI()

@app.get("/hello")
def hello():
    return "Hello"

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = tf.keras.models.load_model('../Models/alzheimer2.h5')

@app.post("/predict")
async def predict():
    # print("Received file:", file.filename)

    # if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
    #     raise HTTPException(status_code=400, detail="Invalid file type. Please upload a valid image.")

    # image = Image.open(file.file).convert("RGB").resize((150,150))
    # image_array = np.array(image) 
    # image_array = image_array.reshape(1,150,150,3)

    # prediction = model.predict(image_array)

    # categories = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]
    # predicted_category = categories[np.argmax(prediction)]

    report = {
        # "prediction_category": predicted_category,
        "precautions": " precautions ",
        "medicine": "medicine ",
        "motivation": " motivational message"}

    return report