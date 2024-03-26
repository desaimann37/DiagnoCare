from flask import Blueprint, jsonify, request 
from bson import Binary
from pymongo import MongoClient
from bson import ObjectId, json_util
from extension import doctor_collection
from flask_jwt_extended import jwt_required, current_user
import base64

doctor_bp = Blueprint('doctor', __name__)

@doctor_bp.route('/add', methods=['POST'])
@jwt_required()
def add_doctor():
    try:
        data = request.form
        file = request.files['photo'] 

        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        doctor_id = current_user.id
        photo = file.read()
        role = data.get('role')
        qualification = data.get('qualification')
        experience = data.get('experience')
        timeslots = data.get('timeslots')
        reviews = data.get('reviews')
        averageRating = data.get('averageRating')
        totalRating = data.get('totalRating')
        isApproved = data.get('isApproved')
        about = data.get('about')
        bio = data.get('bio')
        phone = data.get('phone')
        specification = data.get('specification')
        ticketPrice = data.get('ticketPrice')

        # Convert Binary image data to Base64
        encoded_image = base64.b64encode(photo)

        doctor = {
            'email' : email , 
            'password' : password,
            'name' : name ,
            'doctor_id' : doctor_id,
            'photo' : encoded_image.decode('utf-8'),  # Convert bytes to string
            'role' : role,
            'qualification' : qualification,
            'experience' : experience,
            'timeslots' : timeslots,
            'reviews' : reviews,
            'averageRating' : averageRating,
            'totalRating' : totalRating,
            'isApproved' : isApproved,
            'about' : about,
            'bio' : bio,
            'phone' : phone,
            'specification' : specification,
            'ticketPrice' : ticketPrice
        }

        doctor_collection.insert_one(doctor)
        print("successfully added")

        return jsonify({'message': 'Doctor added successfully'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500


# Get all patients
@doctor_bp.route('/doctors', methods=['GET'])
@jwt_required()
def get_all_doctors():
    try:
        # Retrieve all doctors
        doctors = list(doctor_collection.find({}))

        # Convert Binary image data to Base64 for each doctor
        # for doctor in doctors:
        #     if 'photo' in doctor:
        #         doctor['photo'] = doctor['photo'].to_base64().decode('utf-8')

        # Serialize the doctors list to JSON
        doctors_json = json_util.dumps(doctors)
        
        return doctors_json, 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
