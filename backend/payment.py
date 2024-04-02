import os
import stripe
from flask import Flask, jsonify, request, render_template , Blueprint, json
from dotenv import load_dotenv
from flask_cors import CORS
from flask_jwt_extended import jwt_required, current_user, get_jwt_identity
import base64
from flask_mail import Mail, Message

mail = Mail()

payment_bp = Blueprint('payment', __name__) 

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
stripe_keys = {
    "secret_key": os.environ["STRIPE_SECRET_KEY"],
    "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
}

def send_email_post(to, subject, body):
    try:
        message = Message(subject=subject, recipients=[to], body=body)
        mail.send(message)
        return jsonify({'message': 'Email sent successfully'})
    except Exception as e:
        print('Error sending email:', str(e))
        return jsonify({'error': 'Failed to send email'})

@payment_bp.route("/config")
def get_publishable_key():
    stripe_config = {"publicKey": os.getenv("STRIPE_PUBLISHABLE_KEY")}
    return jsonify(stripe_config)

@payment_bp.route("/create-checkout-session", methods=['POST'])
@jwt_required()
def create_checkout_session():
    domain_url = "https://diagno-care.vercel.app/"
    stripe.api_key = stripe_keys["secret_key"]
    try:
        doctor = request.get_json()
        customer_name = current_user.name
        customer_email = current_user.email
        # photo_data = base64.b64decode(doctor['photo']['$binary']['base64'])
        # photo_url = f"data:image/jpeg;base64,{base64.b64encode(photo_data).decode()}"

        checkout_session = stripe.checkout.Session.create(
            # success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
            success_url=domain_url + "patient/payment-succsess/"+doctor['_id']['$oid'],
            cancel_url=domain_url + "/patient",
            payment_method_types=["card"],
            mode="payment",
            customer_email=current_user.email,
            line_items=[
                {
                    "price_data": {
                        "currency" : 'bdt',
                        "unit_amount" : doctor['price'],
                        "product_data":{
                            "name" : doctor['name'],
                            "description" : doctor['about'],
                            "images" : ['https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg'],
                            # "images" : [photo_url],
                        }
                    },
                    "quantity": 1,
                }
            ],
            billing_address_collection=None
        )

        return jsonify({"session": checkout_session}), 200
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 403

@payment_bp.route("/payment_confirmation_mail", methods=['POST'])
@jwt_required()
def send_payment_confirmation_mail():
    try:
        data = request.get_json()
        customer_name = current_user.name
        customer_email = current_user.email
        doctor_name = data.get('doctor_name')
        doctor_email = data.get('doctor_email')
        appointment_id = data.get('appointment_id') 

        email_data_patient = {
            "to": customer_email,
            "subject": "Appointment Confirmation",
            "body": f"Dear {customer_name}, your appointment has been successfully booked. your meeting ID for the appointment is {appointment_id}. You can Join meetin with https://diagno-care.vercel.app/doctor/meeting?roomID={appointment_id}"
        }
        send_email_post(**email_data_patient)

        email_data_doctor = {
            "to": doctor_email,
            "subject": "New Appointment Booking",
            "body": f"Dear {doctor_name}, a new appointment has been booked by {customer_name} ({customer_email}).  your meeting ID for the appointment is {appointment_id}. You can Join meetin with https://diagno-care.vercel.app/doctor/meeting?roomID={appointment_id}"
        }
        send_email_post(**email_data_doctor)

        return jsonify({"message": "Emails sent successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 500

@payment_bp.route("/success")
def success():
    print("success") 

@payment_bp.route("/cancelled")
def cancelled():
    print("failure")  