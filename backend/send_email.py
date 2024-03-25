from flask import Flask, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
mail = Mail(app)

# Configure mail settings
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'diagnocare31@gmail.com'
app.config['MAIL_PASSWORD'] = 'emje szle ombn vgnp'
app.config['MAIL_DEFAULT_SENDER'] = 'diagnocare31@gmail.com'

mail.init_app(app)

@app.route('/send-mail', methods=['GET'])
def send_email():
    try:
        to = 'ishapaghdal@gmail.com'
        subject = 'Testing'
        body = 'Email Sent with flask only'

        message = Message(subject=subject, recipients=[to], body=body)

        mail.send(message)

        return jsonify({'message': 'Email sent successfully'})
    except Exception as e:
        print('Error sending email:', str(e))
        return jsonify({'error': 'Failed to send email'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)