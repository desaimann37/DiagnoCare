from flask import Flask, request, jsonify, session
from flask_cors import CORS
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['DignoCare']
users_collection = db['users']

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

    users_collection.insert_one(user)
    print("Signup successful")
    return jsonify({'message': 'Signup successful'})

@app.route('/api/signin', methods=['POST'])
def api_signin():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email})

    # if user and check_password_hash(user['password'], password):
    if user and user['password'] == password:
        session['user_id'] = str(user['_id'])
        return jsonify({'message': 'Signin successful', 'user': user})
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/api/dashboard')
def api_dashboard():
    if 'user_id' in session:
        user_id = session['user_id']
        user = users_collection.find_one({'_id': user_id})
        return jsonify({'message': f'Welcome to the dashboard, {user["name"]}!'})
    else:
        return jsonify({'error': 'Not authenticated'}), 401

if __name__ == '__main__':
    app.run(debug=True)
