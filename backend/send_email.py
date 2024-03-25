from flask import Flask, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import requests  # Import requests library to make HTTP requests

load_dotenv()

app = Flask(__name__)
mail = Mail(app)

# Define the endpoint URL of the Nodemailer service
NODEMAILER_ENDPOINT = "http://localhost:3000/send-mail"

@app.route('/send-mail', methods=['GET'])
def send_email():
    try:
        # Prepare the email data
        to_email = 'desaimann37@gmail.com'
        subject = 'Test Email'
        body = 'This is a test email sent from Flask and Nodemailer :)'

        # Make a POST request to the Nodemailer endpoint
        response = requests.post(NODEMAILER_ENDPOINT, json={'to': to_email, 'subject': subject, 'text': body})

        # Check if the request was successful
        if response.status_code == 200:
            return jsonify({'message': 'Email sent successfully'})
        else:
            return jsonify({'error': 'Failed to send email'}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True ,port=5000)
