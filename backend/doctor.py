from flask import Blueprint, json, jsonify, request 
from bson import Binary
from pymongo import MongoClient
from bson import ObjectId, json_util
from extension import doctor_collection,auth_collection
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity
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

# # Get all doctors
@doctor_bp.route('/doctors', methods=['GET'])
@jwt_required()
def get_all_doctors():
    try:
        
        doctors = list(auth_collection.find({'role' : 'doctor'}))
        
        doctors = json_util.dumps(doctors)
        
        return doctors, 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

@doctor_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_doctor_profile():
    try:
         
        doctor_data = auth_collection.find_one({'_id': ObjectId(current_user.id)})
        if doctor_data:
            doctor_data = json.loads(json_util.dumps(doctor_data))
            return jsonify(doctor_data), 200
        else:
            return jsonify({'message': 'Doctor profile not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

@doctor_bp.route('/one_doctor', methods=['POST'])
@jwt_required()
def get_doctor_by_doctorId():
    try:
        data = request.json 
        doctor_id = data.get('doctor_id')

        doctor_data = auth_collection.find_one({'_id': ObjectId(doctor_id)})
        if doctor_data:
            doctor_data = json.loads(json_util.dumps(doctor_data))
            return jsonify(doctor_data), 200
        else:
            return jsonify({'message': 'Doctor profile not found'}), 400
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

@doctor_bp.route('/add_review', methods=['POST'])
@jwt_required()
def add_review():
    try:
        data = request.json 
        doctor_id = data.get('doctor_id')
        patient_id = current_user.id 
        review_date = datetime.now()
        rating = data.get('rating')
        review_content = data.get('review_content')

        patient = auth_collection.find_one({'_id': ObjectId(patient_id)})
        if not patient:
            return jsonify({'error': 'Patient not found'}), 404

        patient_name = patient.get('name')
        patient_photo = patient.get('photo')

        doctor_id = ObjectId(doctor_id)
        print(doctor_id)
        doctor = auth_collection.find_one({'_id': doctor_id})
        if doctor:
            review = {
                'patient_id': patient_id,
                'patient_name': patient_name,
                'patient_photo': patient_photo,
                'rating': rating,
                'review_content': review_content,
                'review_date': datetime.utcnow()
            }
            
            current_rating = doctor.get('rating', 0) 
            review_count = len(doctor.get('reviews', [])) 
            new_rating = (int)(((current_rating * review_count) + rating) / (review_count + 1) )
            
            auth_collection.update_one(
                {'_id': ObjectId(doctor_id)},
                    {
                        '$push': {'reviews': review},
                        '$set': {'rating': new_rating}
                }
            )
            return jsonify({'message': 'Review added successfully'}), 200
        else:
            return jsonify({'error': 'Doctor not found'}), 404
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
