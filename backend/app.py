from flask import Flask
from flask import Flask,request, jsonify
from flask_cors import CORS
# from pymongo import MongoClient
import os
from extension import jwt, auth_collection
# import openai
# from openai import OpenAI
# from dotenv import load_dotenv
# from tensorflow.keras.preprocessing import image
# from config import OPENAI_API_KEY

import tensorflow as tf
from PIL import Image
import numpy as np
import io 
from auth import auth_bp
from extension import db
# import tensorflow as tf
# from PIL import Image
# import numpy as np
# import io 
from pymongo import MongoClient
import tensorflow as tf
import numpy as np
import io 

import os
from extension import jwt, auth_collection
from auth import auth_bp
from users import user_bp

app = Flask(__name__)
CORS(app)

jwt.init_app(app)

# Register blue_print : 
app.register_blueprint(auth_bp , url_prefix='/auth')
app.register_blueprint(user_bp , url_prefix='/users')

class CustomUser:
    def __init__(self, user_dict):
        self.name = user_dict.get('name')
        self.email = user_dict.get('email')

app.secret_key = 'your_secret_key'

# load user : 
@jwt.user_lookup_loader
def user_lookup_callback(__jwt_headers , jwt_data):
    identity = jwt_data['sub']
    # print(type(identity))
    user_dict = auth_collection.find_one({'name': identity})
    if user_dict:
        return CustomUser(user_dict)
    else:
        raise LookupError("User not found")

# additional claims(while getting jwt parameters in postman)
@jwt.additional_claims_loader
def make_additional_claims(identity):
    if identity == "abc":
        return {"is_staff" : True}
    return {"is_staff": False}

# jwt error handlers : 
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_data):
    return jsonify({"message" : "Token has expired", "error": "token_expired"}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({"message" : "Signature Varification failed", "error": "invalid_token"}), 401 

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({"message" : "Request does not contain valid token", "error": "authorization_header"}), 401

"""
@jwt.token_in_blocklist_loader
def token_in_blocklist_callback(jwt_header , jwt_data):
    jti = jwt_data['jti']
    token = TokenBlocklist.__objects(TokenBlocklist.jti == jti)

    return token is not None
"""

    







"""
model1 = tf.keras.models.load_model('../Models/alzheimer2.h5')
model2 = tf.keras.models.load_model('../Models/BrainTumor3.h5')

@app.route('/predict_alzheimer', methods=['POST'])
def predict_alzheimer():
    try:
        file = request.files['file']

        img_bytes = file.read()

        # if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        #     return jsonify({"error": "Invalid file type. Please upload a valid image."}), 400

        img = image.load_img(io.BytesIO(img_bytes), target_size=(150, 150)) # Adjust target_size as needed
        img_array = image.img_to_array(img)
        # img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normalize the image
        # image = Image.open(io.BytesIO(file.read())).convert("RGB").resize((150, 150))
        # image_array = np.array(image)
        image_array = img_array.reshape(1, 150, 150, 3)

        prediction = model1.predict(image_array)

        categories = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]
        predicted_category = categories[np.argmax(prediction)]

        print(predicted_category)

        return jsonify({'prediction': predicted_category}), 200

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

        return jsonify({'prediction': predicted_category}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

"""

if __name__ == '__main__':
    app.run(debug=True)