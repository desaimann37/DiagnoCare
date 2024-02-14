from flask import Blueprint , jsonify , request , session 
from extension import auth_collection


auth_bp = Blueprint('auth' , __name__)

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
            if user['password'] == password:
                
                # Convert ObjectId to string before jsonify
                user['_id'] = str(user['_id'])

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




@auth_bp.route('/signup', methods=['POST'])
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