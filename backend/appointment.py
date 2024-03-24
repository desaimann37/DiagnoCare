from flask import Blueprint, request, jsonify ,current_app
from extension import store_collection, patient_collection, auth_collection, appointment_collection
from flask_mail import Mail, Message

appointment_bp = Blueprint('appointment' , __name__)
mail = Mail()

appointments = []

def send_email(app, recipient, subject, body):
    print(app.config['MAIL_SERVER'])
    print(app.config['MAIL_PORT'])
    print(app.config['MAIL_USE_TLS'])
    print(app.config['MAIL_USERNAME'])
    print(app.config['MAIL_PASSWORD'])
    with app.app_context():
        msg = Message(subject=subject,
                      sender=app.config['MAIL_USERNAME'],
                      recipients=['ishapaghdal@gmail.com'])
        msg.body = body
        try:
            mail.send(msg)
            return True
        except Exception as e:
            print(f"Failed to send email: {str(e)}")
            return False

@appointment_bp.route('/request', methods=['POST'])
def request_appointment():
    data = request.get_json()
    patient_id = data.get('patient_id')
    doctor_id = data.get('doctor_id')
    appointment_date = data.get('appointment_date')
    appointment_time = data.get('appointment_time')

    if not patient_id or not doctor_id or not appointment_date or not appointment_time:
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if patient_id exists in the database
    # patient = Patient.query.get(patient_id)
    # if not patient:
    #     return jsonify({'message': 'Invalid patient ID'}), 400

    # Check if doctor_id exists in the database
    # doctor = Doctor.query.get(doctor_id)
    # if not doctor:
    #     return jsonify({'message': 'Invalid doctor ID'}), 400

    # Assuming patient and doctor IDs are valid and existing in the system
    appointment = {
        'patient_id': patient_id,
        'doctor_id': doctor_id,
        'appointment_date': appointment_date,
        'appointment_time': appointment_time,
        'status': 'pending'  # Appointment status: pending, approved, or denied
    }
    appointments.append(appointment)
    send_email(app=current_app,recipient="ishapaghdal0@gmail.com", subject="Appointment Requested", body="Your appointment request has been sent successfully.")

    return jsonify({'message': 'Appointment requested successfully'}), 200

@appointment_bp.route('/approve', methods=['PUT'])
def approve_appointment():
    data = request.get_json()
    appointment_id = data.get('appointment_id')

    if not appointment_id:
        return jsonify({'message': 'Appointment ID is required'}), 400

    for appointment in appointments:
        if appointment.get('id') == appointment_id:
            appointment['status'] = 'approved'
            return jsonify({'message': 'Appointment approved successfully'}), 200

    return jsonify({'message': 'Appointment not found'}), 404

@appointment_bp.route('/deny', methods=['PUT'])
def deny_appointment():
    data = request.get_json()
    appointment_id = data.get('appointment_id')

    if not appointment_id:
        return jsonify({'message': 'Appointment ID is required'}), 400

    for appointment in appointments:
        if appointment.get('id') == appointment_id:
            appointment['status'] = 'denied'
            return jsonify({'message': 'Appointment denied successfully'}), 200

    return jsonify({'message': 'Appointment not found'}), 404

@appointment_bp.route('/schedule', methods=['PUT'])
def schedule_appointment():
    data = request.get_json()
    appointment_id = data.get('appointment_id')
    appointment_date = data.get('appointment_date')
    appointment_time = data.get('appointment_time')

    if not appointment_id or not appointment_date or not appointment_time:
        return jsonify({'message': 'Missing required fields'}), 400

    for appointment in appointments:
        if appointment.get('id') == appointment_id:
            appointment['appointment_date'] = appointment_date
            appointment['appointment_time'] = appointment_time
            appointment['status'] = 'scheduled'
            return jsonify({'message': 'Appointment scheduled successfully'}), 200

    return jsonify({'message': 'Appointment not found'}), 404