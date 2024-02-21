from flask import Blueprint , jsonify , request 
from extension import auth_collection
from datetime import timedelta
# from models import TokenBlocklist
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
                                create_access_token,
                                create_refresh_token,
                                jwt_required, 
                                get_jwt, 
                                current_user,
                                get_jwt_identity
                            )

auth_bp = Blueprint('auth' , __name__)

# Signup Logic : 
@auth_bp.route('/signup', methods=['POST'])
def api_signup():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')

        if not name:
            return jsonify({'message': 'Name is required'}), 400
        elif not email:
            return jsonify({'message': 'Email is required'}), 400
        elif not password:
            return jsonify({'message': 'password is required'}), 400

        user = auth_collection.find_one({'email': email})

        # print(user['email'])
        # print(email)

        # Check weather input email is existing in out database or not? 
        if user and 'email' in user and email == user['email']:
            return jsonify({'message': 'Email Already Existed with this Email address!'}), 400
         

        hash_password = generate_password_hash(password, method='pbkdf2:sha256')
        user = {
            'name': name,
            'email': email,
            'password': hash_password
        }
        auth_collection.insert_one(user)
        print("Signup successful")
        return jsonify({'message': 'Signup successful'})
    except Exception as e:
        print(e)  
        return jsonify({'error': 'Internal server error'}), 500


# Login (With JWT Authentication): 
@auth_bp.route('/login', methods=['POST'])
def api_login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email:
            return jsonify({'message': 'Email is required'}), 400
        elif not password:
            return jsonify({'message': 'Password is required'}), 400

        user = auth_collection.find_one({'email': email})
        
        if user:
            hashed_password = user.get('password')
            if check_password_hash(hashed_password, password):
                 # Define a custom expiration time (e.g., 1 day)
                custom_expiration_time = timedelta(days=1)

                access_token = create_access_token(identity=user['name'], expires_delta=custom_expiration_time)
                refresh_token = create_refresh_token(identity=user['name'], expires_delta=custom_expiration_time)
                
                # Passwords match
                user['_id'] = str(user['_id'])  # Convert ObjectId to string
                # session['user'] = {
                #     'email': user['email'],
                #     'name': user['name']
                # }
                return jsonify(
                    {
                        'message': 'Login successful', 
                        'user': user,
                        'tokens' : {
                            "access":access_token,
                            "refresh": refresh_token,
                        }
                    }
                ), 200
            else:
                return jsonify({'message': 'Incorrect password'}), 401
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)  # Print the traceback for debugging
        return jsonify({'error': 'Internal server error'}), 500

"""
# Logout User : 
@auth_bp.route('/logout' , methods=['GET'])
@jwt_required()
def logout_user():
    jwt = get_jwt()
    jti = jwt['jti']
    token_block_list = TokenBlocklist(jti = jti)
    token_block_list.save()

    return jsonify({"message": "Logged Out Successfully"}), 200
"""

@auth_bp.get('/whoami')
@jwt_required()
def whoami():
    return jsonify({"message" : "message", "user_details" : {"name": current_user.name, "email": current_user.email}})


#used for identify user name for which access_token generated!
@auth_bp.get('/refresh')
@jwt_required(refresh = True)
def refresh_access():
    identity = get_jwt_identity()
    new_access_token = create_access_token(identity=identity)
    return jsonify({"access_token": new_access_token})