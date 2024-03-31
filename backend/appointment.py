from flask import Blueprint, request, jsonify
from extension import appointment_collection , auth_collection 
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity
from datetime import datetime
from bson import ObjectId
from doctor import get_doctor_by_doctorId
import requests
import base64

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('/add', methods=['POST'])
@jwt_required()
def add_appointment():
    try:
        data = request.json
        doctor_id = data.get('doctor_id')
        patient_id = current_user.id
        price = data.get('price')
        booking_date = datetime.now()
        
        appointment_data = {
            'doctor_id': doctor_id,
            'patient_id': patient_id,
            'price': price,
            'booking_date': booking_date,
        }
        appointment_collection.insert_one(appointment_data)
        
        appointment_id = str(appointment_data['_id'])

        return jsonify({'message': 'Appointment added successfully', 'appointment_id': appointment_id}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/doctor', methods=['GET'])
@jwt_required()
def get_appointments_with_patients_by_doctor():
    try:
        doctor_id = current_user.id
        doctor_data = auth_collection.find_one({'_id': ObjectId(doctor_id)})
        
        appointments_cursor = appointment_collection.find({'doctor_id': doctor_id})
        appointments = []
        
        for appointment in appointments_cursor:
            patient_id = appointment['patient_id']
            
            patient_data = auth_collection.find_one({'_id': ObjectId(patient_id)})
            
            if patient_data:
                patient_photo = base64.b64encode(patient_data['photo']).decode('utf-8')
                appointment_id = str(appointment['_id'])

                appointment = {
                    'appointment_id': appointment_id,
                    'patient_id': str(patient_data['_id']), 
                    'patient_name': patient_data['name'],
                    'patient_email': patient_data['email'],
                    'patient_photo': patient_photo,
                    'appointment_date': appointment['booking_date'],
                    'price': appointment['price'],
                    'doctor_name': doctor_data['name'],
                    'doctor_email': doctor_data['email']
                }
                
                appointments.append(appointment)
            else:
                error_message = f"Failed to fetch patient patient_id: {patient_id}"
                print(error_message)
        
        return jsonify({'appointments': appointments}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/patient', methods=['GET'])
@jwt_required()
def get_appointments_with_doctors_by_patient():
    try:
        patient_id = current_user.id
        patient_data = auth_collection.find_one({'_id': ObjectId(patient_id)})
        
        appointments_cursor = appointment_collection.find({'patient_id': patient_id})
        appointments = []
        
        for appointment in appointments_cursor:
            doctor_id = appointment['doctor_id']
            
            doctor_data = auth_collection.find_one({'_id': ObjectId(doctor_id)})
            
            if doctor_data:
                doctor_photo = base64.b64encode(doctor_data['photo']).decode('utf-8')
                appointment_id = str(appointment['_id'])

                appointment = {
                    'appointment_id': appointment_id,
                    'doctor_id': str(doctor_data['_id']),  
                    'doctor_name': doctor_data['name'],
                    'doctor_email': doctor_data['email'],
                    'doctor_photo': doctor_photo,
                    'appointment_date': appointment['booking_date'],
                    'price': appointment['price'],
                    'specialization' : doctor_data['specialization'],
                    'patient_name': patient_data['name'],
                    'patient_email': patient_data['email']
                }
                
                appointments.append(appointment)
            else:
                error_message = f"Failed to fetch doctor doctor_id: {doctor_id}"
                print(error_message)
        
        return jsonify({'appointments': appointments}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/list', methods=['GET'])
def list_appointments():
    try:
        appointments = list(appointment_collection.find({}))
        
        return jsonify({'appointments': appointments}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
