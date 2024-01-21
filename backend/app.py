from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
# from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

# Connect to MongoDB
client = MongoClient('mongodb+srv://dm_37:SWKIOAkzdQgoWn68@cluster0.u4wm1ik.mongodb.net/sdp_backend')
db = client['sdp_backend']
auth_collection = db['auth']

@app.route('/hello' , methods=['GET'])
def sayHello():
    return "Hello User!"



@app.route('/api/signup', methods=['POST'])
def api_signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    # password = generate_password_hash(data.get('password'), method='sha256')
    password = data.get('password')

    user = {
        'name': name,
        'email': email,
        'password': password
    }
    # Here Instead of manually getting JSON data from POSTMAN we need to get it from frontend !!
    #For the same in frontend axios url to post data entered by user will be passed to '/api/signup' end point and from there POST Method will be called automatically!

    auth_collection.insert_one(user)
    print("Signup successful")
    return jsonify({'message': 'Signup successful'})


if __name__ == '__main__':
    app.run(debug=True)
