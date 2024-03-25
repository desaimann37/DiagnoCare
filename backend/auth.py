from flask import Blueprint , jsonify , request 
from extension import auth_collection,  patient_collection
from datetime import timedelta
from bson import ObjectId, json_util
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
                                create_access_token,
                                create_refresh_token,
                                jwt_required, 
                                current_user,
                                get_jwt_identity,
                                set_access_cookies,
                                current_user
                            )   
auth_bp = Blueprint('auth' , __name__)

# Signup Logic : 
@auth_bp.route('/signup', methods=['POST'])
def api_signup():
    try:
        data = request.get_json()
        print(data)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        role = data.get('Role', 'doctor')
        if(role == '0'):
            role = 'patient'
        else:
            role = 'doctor' 

        print(role)

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
            'password': hash_password,
            'role': role 
        }
        auth_collection.insert_one(user)

        # Define a custom expiration time (e.g., 1 day)
        custom_expiration_time = timedelta(days=1)
        access_token = create_access_token(identity=user['name'], expires_delta=custom_expiration_time)
        refresh_token = create_refresh_token(identity=user['name'], expires_delta=custom_expiration_time)
        # Passwords match
        user['_id'] = str(user['_id'])  # Convert ObjectId to string

        print("Signup successful")

        response = jsonify({'message': 'Signup successful', 'user': user, 'tokens' : {"access":access_token,    "refresh": refresh_token}})
        response.set_cookie('access_token_cookie', value=access_token, httponly=True)
        return response,200
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
        role = data.get('role')

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

                # Check the user's role
                user_role = user.get('role', 'doctor')  # Default role is 'user'
                if user_role == 'doctor':
                    # Additional logic for admin role
                    # For example, you could include additional data in the response
                    response_data = {
                        'message': 'Doctor login successful',
                        'user': user,
                        'tokens': {
                            'access': access_token,
                            'refresh': refresh_token
                        }
                    }
                else:
                    response_data = {
                        'message': 'Patient login successful',
                        'user': user,
                        'tokens': {
                            'access': access_token,
                            'refresh': refresh_token
                        }
                    }
                
                # response = jsonify(
                #     {
                #         'message': 'Login successful', 
                #         'user': user,
                #         'tokens' : {
                #             "access": access_token,
                #             "refresh": refresh_token,
                #         }
                #     }
                # )

                response = jsonify(response_data)

                # set_access_cookies(response, access_token)
                response.set_cookie('auth_cookie', value=access_token, httponly=True, secure=True, max_age=custom_expiration_time.total_seconds())
                print("end...")
                return response,200
            else:
                return jsonify({'message': 'Incorrect password'}), 401
        else:
            return jsonify({'message': 'User not found'}), 404
    except Exception as e:
        print(e)  # Print the traceback for debugging
        return jsonify({'error': 'Internal server error'}), 500

# Logout User : 
"""    
@auth_bp.route('/logout' , methods=['GET'])
@jwt_required()
def logout_user():
    jwt = get_jwt()
    jti = jwt['jti']
    token_block_list = TokenBlocklist(jti = jti)
    token_block_list.save()
    return jsonify({"message": "Logged Out Successfully"}), 200
"""

# Doctor's information : 
@auth_bp.get('/account')
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


# CHATGPTed------------->>>>>>>

# Add new patient 
@auth_bp.route('/patients', methods=['POST'])
@jwt_required()
def add_patient():
    try:
        data = request.get_json()
        name = data.get('name')
        address = data.get('address')
        phone_number = data.get('phone_number')
        doctor_id = current_user.id

        if not name:
            return jsonify({'message': 'Name is required'}), 400

        patient = {
            'name': name,
            'address': address,
            'phone_number': phone_number,
            'doctor_id': doctor_id, 
        }

        patient_collection.insert_one(patient)

        return jsonify({'message': 'Patient added successfully'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

# Update patient
@auth_bp.route('/patients/<patient_id>', methods=['PUT'])
@jwt_required()
def update_patient(patient_id):
    try:
        data = request.get_json()
        patient = patient_collection.find_one({'_id': ObjectId(patient_id), 'doctor_id': current_user.id})

        if not patient:
            return jsonify({'message': 'Patient not found'}), 404

        patient.update(data)
        patient_collection.update_one({'_id': ObjectId(patient_id)}, {'$set': patient})

        return jsonify({'message': 'Patient updated successfully'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 

# Select a particular patient
@auth_bp.route('/patient/<patient_id>', methods=['GET'])
@jwt_required()
def select_patient(patient_id):
    try:
        patient = patient_collection.find_one({'_id': ObjectId(patient_id), 'doctor_id': current_user.id})

        if not patient:
            return jsonify({'message': 'Patient not found'}), 404

        patient_json = json_util.dumps(patient)
        return patient_json, 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

# Delete patient
@auth_bp.route('/patients/<patient_id>', methods=['DELETE'])
@jwt_required()
def delete_patient(patient_id):
    try:
        result = patient_collection.delete_one({'_id': ObjectId(patient_id), 'doctor_id': current_user.id})

        if result.deleted_count == 0:
            return jsonify({'message': 'Patient not found'}), 404

        return jsonify({'message': 'Patient deleted successfully'}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
    

#Get all patients
@auth_bp.route('/patients', methods=['GET'])
@jwt_required()
def get_all_patients():
    try:
        
        patients = list(patient_collection.find({'doctor_id': current_user.id}))
        
        patients = json_util.dumps(patients)
        
        return patients, 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

# Search
@auth_bp.route('/patients/search', methods=['GET'])
@jwt_required()
def search_patient():
    try:
        query = request.args.get('query')

        if not query:
            return jsonify({'message': 'Query parameter is required'}), 400

        patients = list(patient_collection.find({'doctor_id': current_user.id,
                                                 '$or': [{'name': {'$regex': query, '$options': 'i'}},
                                                         {'email': {'$regex': query, '$options': 'i'}}]}))
        patients_json = json_util.dumps(patients)
        return patients_json, 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500