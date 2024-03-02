from flask import Blueprint , request , jsonify
from auth import auth_collection
from extension import mongo
from flask_jwt_extended import jwt_required, get_jwt


user_bp = Blueprint(
    'users',
    __name__
)

#Pagination : 
def paginate(collection_name, page, per_page):
    database = mongo['sdp_backend']
    collection = database[collection_name]

    skip = (page - 1) * per_page
    result = collection.find().skip(skip).limit(per_page)

    result_list = []
    for document in result:
        document['_id'] = str(document['_id'])
        result_list.append(document)

    return jsonify(result_list)

@user_bp.get('/doctor/list')
@jwt_required()
def get_all_users():
    claims = get_jwt()
    # print(claims)
    if claims.get('is_staff') == True:
        page = int(request.args.get('page', 1))  # default to page 1 if not provided
        per_page = int(request.args.get('per_page', 3))  # default to 10 items per page if not provided
        users = paginate(auth_collection.name , page , per_page)
        # print(users)
        # print(type(users))
        return users
    
    return jsonify({"message": "You are not authorized to access this "}), 401
