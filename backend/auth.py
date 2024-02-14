from flask import Blueprint , jsonify , request , session 
from extension import auth_collection
from werkzeug.security import generate_password_hash, check_password_hash


auth_bp = Blueprint('auth' , __name__)


@auth_bp.route('/signup', methods=['POST'])
def api_signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name or not email or not password:
            return jsonify({'message': 'Name, email, and password are required'}), 400

        hash_password = generate_password_hash(password, method='sha256')

        user = {
            'name': name,
            'email': email,
            'password': hash_password
        }

        auth_collection.insert_one(user)
        print("Signup successful")
        return jsonify({'message': 'Signup successful'})
    except Exception as e:
        print(e)  # Print the traceback for debugging
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/login', methods=['POST'])
def api_login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400

        user = auth_collection.find_one({'email': email})

        if user:
            hashed_password = user.get('password')
            if check_password_hash(hashed_password, password):
                # Passwords match
                user['_id'] = str(user['_id'])  # Convert ObjectId to string
                session['user'] = {
                    'email': user['email'],
                    'name': user['name']
                }
                return jsonify({'message': 'Login successful', 'user': user})
            else:
                return jsonify({'message': 'Incorrect password'}), 401
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)  # Print the traceback for debugging
        return jsonify({'error': 'Internal server error'}), 500



