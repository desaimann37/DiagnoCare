from pymongo import MongoClient
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, get_jwt_identity


# MONGODB URI
MONGO_URI = 'mongodb+srv://dm_37:SWKIOAkzdQgoWn68@cluster0.u4wm1ik.mongodb.net/sdp_backend'
mongo = MongoClient(MONGO_URI)
db = mongo.get_database()
backend = db['sdp_backend']
auth_collection = backend['auth']
jwt = JWTManager()




