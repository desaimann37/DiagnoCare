from bson import ObjectId
from flask import Flask
from flask import Flask,request, jsonify
from flask_cors import CORS
from extension import jwt, auth_collection
import tensorflow as tf
from flask_mail import Mail, Message
from PIL import Image
import numpy as np
from extension import db
from auth import auth_bp
from users import user_bp
from store import store_bp
from doctor import doctor_bp
from payment import payment_bp
from appointment import appointment_bp
from flask_jwt_extended import JWTManager
from predict import predict_alzheimer,predict_braintumor,predict_diabetes,predict_lungcancer
import os
from flask import request

app = Flask(__name__)
CORS(app)
mail = Mail(app)

"""
# Configure Flask-JWT-Extended
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/auth/login/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = True 
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)  # Custom expiration time
"""

# Configure mail settings
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'diagnocare31@gmail.com'
app.config['MAIL_PASSWORD'] = 'emje szle ombn vgnp'
app.config['MAIL_DEFAULT_SENDER'] = 'diagnocare31@gmail.com'

jwt = JWTManager(app)

jwt.init_app(app)
mail.init_app(app)

# Register blue_print : 
app.register_blueprint(auth_bp , url_prefix='/auth')
app.register_blueprint(user_bp , url_prefix='/users')
app.register_blueprint(store_bp, url_prefix='/store')
app.register_blueprint(doctor_bp, url_prefix='/doctor')
app.register_blueprint(payment_bp, url_prefix='/payment')
app.register_blueprint(appointment_bp, url_prefix='/appointment')

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
    user_dict = auth_collection.find_one({'_id': ObjectId(identity)})
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

@app.route('/predict_braintumor', methods=['POST'])
def endpoint_predict_braintumor():
    return predict_braintumor()

@app.route('/predict/diabetes', methods=['POST'])
def endpoint_predict_diabetes():
    return predict_diabetes()

@app.route('/predict/lungcancer', methods=['POST'])
def endpoint_predict_lungcancer():
    return predict_lungcancer()

@app.route('/send-mail', methods=['GET'])
def send_email():
    try:
        to = 'desaimann37@gmail.com'
        subject = 'Testing'
        body = 'Email Sent with flask only'

        # Create a Message object
        message = Message(subject=subject, recipients=[to], body=body)

        # Attach the zip file
        with app.open_resource("C:\\Users\\Admin\\Downloads\\patient_data.zip") as zip_file:
            message.attach("file.zip", "application/zip", zip_file.read())

        # Send the email
        mail.send(message)

        return jsonify({'message': 'Email sent successfully'})
    except Exception as e:
        print('Error sending email:', str(e))
        return jsonify({'error': 'Failed to send email'})
        



@app.route('/send-mail-from-doctor', methods=['POST'])
def send_email2():
    try:
        # Get the PDF file from the request FormData
        pdf_file = request.files['pdf']
        
        # Extract other form data if needed
        # formData = request.form
        
        # You can use the form data or any other information if needed
        
        to = 'desaimann37@gmail.com'
        subject = 'Testing'
        body = 'Email Sent with flask only'

        # Create a Message object
        message = Message(subject=subject, recipients=[to], body=body)
        
        # Generate a new filename for the attached PDF
        new_filename = 'Your_Report.pdf'  # Change this to your desired filename
        
        # Attach the PDF file to the email with the new filename
        message.attach(new_filename, 'application/pdf', pdf_file.read())

        # Send the email
        mail.send(message)

        return jsonify({'message': 'Email sent successfully'})
    except Exception as e:
        print('Error sending email:', str(e))
        return jsonify({'error': 'Failed to send email'})


if __name__ == '__main__':
    app.run(debug=True)