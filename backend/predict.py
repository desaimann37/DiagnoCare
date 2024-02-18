from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import io
import os
from dotenv import load_dotenv
from openai import OpenAI
import re

app = Flask(__name__)
CORS(app)  

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key = OPENAI_API_KEY)

model1 = tf.keras.models.load_model('../Models/alzheimer2.h5')
model2 = tf.keras.models.load_model('../Models/BrainTumor3.h5')

def generate_report(predicted_category,disease):
    prompt_Symtoms = f"You are a medical practictioner and an expert working for a very reputed hospital.Give Symptoms for the disease:{disease} of the category: {predicted_category}."
    prompt_Cause = f"You are a medical practictioner and an expert working for a very reputed hospital.Give Cause for the disease:{disease} of the category: {predicted_category}."
    prompt_Treatment = f"You are a medical practictioner and an expert working for a very reputed hospital.Give Treatment for the disease:{disease} of the category: {predicted_category}."
    prompt_Recommendation = f"You are a medical practictioner and an expert working for a very reputed hospital.Give Recommendation for the disease:{disease} of the category: {predicted_category}."

    Symptoms = client.chat.completions.create(
        model="gpt-3.5-turbo",  
        messages=[
           {"role": "system", "content": "Answer the question in less than 20 words based on the content below, and if the question can't be answered based on the content, say \"I don't know\"\n\n"},
            {"role": "user","content": prompt_Symtoms}
        ],
        # max_tokens=70
    )

    Cause = client.chat.completions.create(
        model="gpt-3.5-turbo",  
        messages=[
           {"role": "system", "content": "Answer the question in less than 20 words based on the content below, and if the question can't be answered based on the content, say \"I don't know\"\n\n"},
            {"role": "user","content": prompt_Cause}
        ],
        # max_tokens=70
    )

    Treatment = client.chat.completions.create(
        model="gpt-3.5-turbo",  
        messages=[
           {"role": "system", "content": "Answer the question in less than 30 words based on the content below, and if the question can't be answered based on the content, say \"I don't know\"\n\n"},
            {"role": "user","content": prompt_Treatment}
        ],
        # max_tokens=70
    )

    Recommendation = client.chat.completions.create(
        model="gpt-3.5-turbo",  
        messages=[
           {"role": "system", "content": "Answer the question in less than 40 words based on the content below, and if the question can't be answered based on the content, say \"I don't know\"\n\n"},
            {"role": "user","content": prompt_Recommendation}
        ],
        # max_tokens=70
    )

    # print(response.choices[0].message)
    # medical_report = parse_medical_report(response.choices[0].message.content)
    return {'Symptoms' : Symptoms.choices[0].message.content, 'predicted_category' : predicted_category, 'Treatment' : Treatment.choices[0].message.content, 'Recommendation' : Recommendation.choices[0].message.content}

@app.route('/predict_alzheimer', methods=['POST'])
def predict_alzheimer():
    try:
        file = request.files['file']

        img_bytes = file.read()

        img = image.load_img(io.BytesIO(img_bytes), target_size=(150, 150))
        img_array = image.img_to_array(img)
        image_array = img_array.reshape(1, 150, 150, 3)

        prediction = model1.predict(image_array)

        categories = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]
        predicted_category = categories[np.argmax(prediction)]

        print(predicted_category)
        medical_report = generate_report(predicted_category,"alzheimer")

        return jsonify(medical_report), 200

    except Exception as e:
        print(e)
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

@app.route('/predict_braintumor', methods=['POST'])
def predict_braintumor():
    try:
        file = request.files['file']

        img_bytes = file.read()

        img = image.load_img(io.BytesIO(img_bytes), target_size=(150, 150)) 
        img_array = image.img_to_array(img)
        image_array = img_array.reshape(1, 150, 150, 3)

        prediction = model2.predict(image_array)

        categories = ["Glioma Tumor", "Meningioma Tumor", "No Tumor", "Pituitary Tumor"]
        predicted_category = categories[np.argmax(prediction)]

        print(predicted_category)
        medical_report = generate_report(predicted_category,"braintumor")

        return jsonify(medical_report), 200

    except Exception as e:
        print(e)
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True , port=5000) 