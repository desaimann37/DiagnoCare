from flask import Flask
from flask import Flask,request, jsonify
from flask_cors import CORS
from extension import jwt, auth_collection
import tensorflow as tf
from PIL import Image
import numpy as np
from extension import db
from auth import auth_bp
from users import user_bp
from flask_jwt_extended import JWTManager
from predict import predict_alzheimer,predict_braintumor,predict_diabetes,predict_lungcancer

app = Flask(__name__)
CORS(app)

"""
# Configure Flask-JWT-Extended
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/auth/login/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = True 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)  # Custom expiration time
"""
jwt = JWTManager(app)

jwt.init_app(app)

# Register blue_print : 
app.register_blueprint(auth_bp , url_prefix='/auth')
app.register_blueprint(user_bp , url_prefix='/users')

class CustomUser:
    def __init__(self, user_dict):
        self.id = str(user_dict.get('_id'))
        self.name = user_dict.get('name')
        self.email = user_dict.get('email')

app.secret_key = 'your_secret_key'

"""
@app.route('/predict/diabetes')
def run_predict():
    try:
        exec(open('predict.py').read())
        return 'predict.py seccessfully running!'
    except Exception as e:
        return f"Error while running file {e}" 
"""

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
    if identity:
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


@app.route('/predict_alzheimer', methods=['POST'])
def endpoint_predict_alzheimer():
    return predict_alzheimer()

@app.route('/predict/braintumor', methods=['POST'])
def endpoint_predict_braintumor():
    return predict_braintumor()

@app.route('/predict/diabetes', methods=['POST'])
def endpoint_predict_diabetes():
    return predict_diabetes()

@app.route('/predict/lungcancer', methods=['POST'])
def endpoint_predict_lungcancer():
    return predict_lungcancer()



if __name__ == '__main__':
    app.run(debug=True)