from flask import Flask, jsonify
from flask_cors import CORS
from auth import auth_bp, auth_collection
from extension import db , jwt , MONGO_URI
from users import user_bp
# from flask_mongoengine import MongoEngine
# from models import TokenBlocklist

# import tensorflow as tf
# from PIL import Image
# import numpy as np
# import io 


# from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

"""
app.config['MONGODB_SETTINGS'] = {
    'db': 'sdp_backend',
    'host': MONGO_URI,
}
db_instance = MongoEngine(app)

"""

CORS(app)
app.secret_key = 'your_secret_key'

# Mongodb Name : 
print(db.name)

jwt.init_app(app)


# Register blue_print : 
app.register_blueprint(auth_bp , url_prefix='/auth')
app.register_blueprint(user_bp , url_prefix='/users')

class CustomUser:
    def __init__(self, user_dict):
        self.name = user_dict.get('name')
        self.email = user_dict.get('email')



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
model = tf.keras.models.load_model('../Models/alzheimer2.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']

        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            return jsonify({"error": "Invalid file type. Please upload a valid image."}), 400

        image = Image.open(io.BytesIO(file.read())).convert("RGB").resize((150, 150))
        image_array = np.array(image)
        image_array = image_array.reshape(1, 150, 150, 3)

        prediction = model.predict(image_array)

        categories = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]
        predicted_category = categories[np.argmax(prediction)]

        report = {
            "prediction_category": "predicted_category",
            "precautions": "Include precautions information based on the predicted category.",
            "medicine": "Include medicine information based on the predicted category.",
            "motivation": "Include motivational message based on the predicted category."
        }

        return jsonify(report), 200

    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

"""

if __name__ == '__main__':
    app.run(debug=True)





