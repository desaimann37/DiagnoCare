from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
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

