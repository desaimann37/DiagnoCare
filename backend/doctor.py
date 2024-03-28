from flask import Blueprint, json, jsonify, request 
from bson import Binary
from pymongo import MongoClient
from bson import ObjectId, json_util
from extension import doctor_collection, auth_collection
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
        data = request.form.to_dict(flat=False)  # Parse form data to dictionary

        file = request.files['photo']
        image = PILImage.open(file)
    
        user = auth_collection.find_one({'_id': ObjectId(current_user.id)})
        
        img_byte_array = BytesIO()
        image.save(img_byte_array, format=image.format)
        encoded_image = Binary(img_byte_array.getvalue())

        qualifications = []
        experiences = []
        timeslots = []

      
        if data.get('qualifications[startDate]'):
            for i in range(len(data.get('qualifications[startDate]'))):
                qualification = {
                    'startDate': datetime.strptime(data.get('qualifications[startDate]')[i], '%Y-%m-%d'),
                    'endDate': datetime.strptime(data.get('qualifications[endDate]')[i], '%Y-%m-%d'),
                    'degree': data.get('qualifications[degree]')[i],
                    'university': data.get('qualifications[university]')[i]
                }
                qualifications.append(qualification)

        if data.get('experiences[startDate]'):
            for i in range(len(data.get('experiences[startDate]'))):
                experience = {
                    'startDate': datetime.strptime(data.get('experiences[startDate]')[i], '%Y-%m-%d'),
                    'endDate': datetime.strptime(data.get('experiences[endDate]')[i], '%Y-%m-%d'),
                    'position': data.get('experiences[position]')[i],
                    'location': data.get('experiences[location]')[i]
                }
                experiences.append(experience)

        if data.get('timeslots[date]'):
            for i in range(len(data.get('timeslots[date]'))):
                timeslot = {
                    'date': datetime.strptime(data.get('timeslots[date]')[i], '%Y-%m-%d'),
                    'startTime': data.get('timeslots[startTime]')[i],
                    'endTime': data.get('timeslots[endTime]')[i]
                }
                timeslots.append(timeslot)

        email = data.get('email')[0]
        name = data.get('name')[0]
        password = user.get('password')
        role = user.get('role')
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
            'password' : password,
            'role' : role,
            'phone': phone,
            'bio': bio,
            'specialization': specialization,
            'price': price,
            'about': about,
            'photo': photo,

        }

        if qualifications:
            doctor['qualifications'] = qualifications

        if experiences:
            doctor['experiences'] = experiences

        if timeslots:
            doctor['timeslots'] = timeslots
        
        if user:
            user.update(doctor)
            # Update profile information in the document
            auth_collection.update_one({'_id': ObjectId(current_user.id)}, {'$set': user})

            return jsonify({'message': 'Profile saved successfully'}), 200
        else:
            return jsonify({'message': 'User profile not found'}), 404
     except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

@doctor_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_doctor_profile():
    try:
        doctor_data = auth_collection.find_one({'_id': ObjectId(current_user.id)})
        if doctor_data:
            # Ensure all fields are JSON serializable
            doctor_data = json.loads(json_util.dumps(doctor_data))
            return jsonify(doctor_data), 200
        else:
            return jsonify({'message': 'Doctor profile not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

