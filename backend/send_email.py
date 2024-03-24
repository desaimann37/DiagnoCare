from flask import Blueprint, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

# Configuring Flask-Mail
mail = Mail()

email_bp = Blueprint('email' , __name__)

@email_bp.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    recipient_email = data.get('email')

    if recipient_email:
        sender_email = os.getenv('SENDER_EMAIL')
        sender_password = os.getenv('SENDER_PASSWORD')

        if sender_email and sender_password:
            try:
                # Create a message object
                msg = Message(subject="Dummy Text Email",
                              sender=sender_email,
                              recipients=[recipient_email])

                # Set the body of the email
                msg.body = "This is a dummy email sent from Flask."

                # Send the email
                mail.send(msg)
                return jsonify({"message": "Email sent successfully"}), 200
            except Exception as e:
                return jsonify({"message": f"Failed to send email: {str(e)}"}), 500
        else:
            return jsonify({"message": "Sender email or password not configured"}), 500
    else:
        return jsonify({"message": "Missing recipient email"}), 400
