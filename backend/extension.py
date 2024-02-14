from pymongo import MongoClient

# MONGODB URI
MONGO_URI = 'mongodb+srv://dm_37:SWKIOAkzdQgoWn68@cluster0.u4wm1ik.mongodb.net/sdp_backend'
mongo = MongoClient(MONGO_URI)
db = mongo.get_database()
backend = db['sdp_backend']
auth_collection = backend['auth']

