from pymongo import MongoClient


client = MongoClient("mongodb+srv://tanisha:1234@cluster0.g1yz8mq.mongodb.net")
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Successfully connected to MongoDB!")
except Exception as e:
    print(e)

db1 = client.diabetes
db2 = client.lungcancer

collection_name1 = db1["diabetes_collection"]
collection_name2 = db2["lungcancer_collection"]

