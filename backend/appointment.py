from flask import Blueprint, request, jsonify
from extension import appointment_collection
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity
from datetime import datetime

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
        
        return jsonify({'message': 'Appointment added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@appointment_bp.route('/list', methods=['GET'])
def list_appointments():
    try:
        # Example: Fetch all appointments from the appointment collection
        appointments = list(appointment_collection.find({}))
        
        return jsonify({'appointments': appointments}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# You can add more routes for updating, deleting, or retrieving specific appointments as needed
