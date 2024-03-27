from flask import Blueprint, jsonify, request 
from bson import Binary
from pymongo import MongoClient
from bson import ObjectId, json_util
from extension import doctor_collection
from flask_jwt_extended import jwt_required, current_user
import base64
from PIL import Image as PILImage
from io import BytesIO
from datetime import datetime

doctor_bp = Blueprint('p-layout', __name__)

@doctor_bp.route('/add', methods=['POST'])
@jwt_required()
def add_doctor():
    try:
        print("from backend")
        data = request.form.to_dict(flat=False)  # Parse form data to dictionary
        print(data)
        file = request.files['photo']
        image = PILImage.open(file)

        img_byte_array = BytesIO()
        image.save(img_byte_array, format=image.format)
        encoded_image = Binary(img_byte_array.getvalue())

        qualifications = []
        experiences = []
        timeslots = []

        # Extract qualifications
        for i in range(len(data.get('qualifications[startDate]'))):
            qualification = {
                'startDate': datetime.strptime(data.get('qualifications[startDate]')[i], '%Y-%m-%d'),
                'endDate': datetime.strptime(data.get('qualifications[endDate]')[i], '%Y-%m-%d'),
                'degree': data.get('qualifications[degree]')[i],
                'university': data.get('qualifications[university]')[i]
            }
            qualifications.append(qualification)

        # Extract experiences
        for i in range(len(data.get('experiences[startDate]'))):
            experience = {
                'startDate': datetime.strptime(data.get('experiences[startDate]')[i], '%Y-%m-%d'),
                'endDate': datetime.strptime(data.get('experiences[endDate]')[i], '%Y-%m-%d'),
                'position': data.get('experiences[position]')[i],
                'location': data.get('experiences[location]')[i]
            }
            experiences.append(experience)

        # Extract timeslots
        for i in range(len(data.get('timeslots[date]'))):
            timeslot = {
                'date': datetime.strptime(data.get('timeslots[date]')[i], '%Y-%m-%d'),
                'startTime': data.get('timeslots[startTime]')[i],
                'endTime': data.get('timeslots[endTime]')[i]
            }
            timeslots.append(timeslot)

        # Extract other basic information
        email = data.get('email')[0]
        name = data.get('name')[0]
        doctor_id = current_user.id
        photo = encoded_image
        about = data.get('about')[0]
        bio = data.get('bio')[0]
        phone = data.get('phone')[0]
        specialization = data.get('specialization')[0]
        price = data.get('price')[0]

        doctor = {
            'doctor_id': doctor_id,
            'name': name,
            'email': email,
            'phone': phone,
            'bio': bio,
            'specialization': specialization,
            'price': price,
            'qualifications': qualifications,
            'experiences': experiences,
            'timeslots': timeslots,
            'about': about,
            'photo': photo,
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
