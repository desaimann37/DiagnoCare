from flask import Flask, request, jsonify
import pickle
from models.DiabetesModel import DiabetesModel
from models.LungCancerModel import LungCancerModel
import sklearn
from config.database import collection_name1, collection_name2
from bson import ObjectId  # Used by MongoDB to identify IDs created by itself

app = Flask(__name__)

print('The scikit-learn version is {}.'.format(sklearn.__version__))

# Load trained model
with open("pklFiles/Diabetes.pkl", "rb") as f:
    classifier1 = pickle.load(f)

with open("pklFiles/LungCancer.pkl", "rb") as f:
    classifier2 = pickle.load(f)


@app.route('/get/diabetes', methods=['GET'])
def get_diabetes_objects():
    diabetes_objects = list(collection_name1.find())
    return jsonify(diabetes_objects)


@app.route('/get/lungcancer', methods=['GET'])
def get_lungcancer_objects():
    lungcancer_objects = list(collection_name2.find())
    return jsonify(lungcancer_objects)


@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
    data = request.json
    print(data)
    HighBP = int(data['HighBP'])
    HighChol = int(data['HighChol'])
    CholCheck = int(data['CholCheck'])
    BMI = float(data['BMI'])
    Stroke = int(data['Stroke'])
    HeartDiseaseorAttack = int(data['HeartDiseaseorAttack'])
    Sex = int(data['Sex'])
    Age = int(data['Age'])

    prediction = classifier1.predict([[HighBP, HighChol, CholCheck, BMI, Stroke, HeartDiseaseorAttack, Sex, Age]])

    if prediction[0] == 0:
        prediction = "No Diabetes"
    elif prediction[0] == 1:
        prediction = "Pre Diabetes"
    else:
        prediction = "Diabetes"

    data['Result'] = prediction

    collection_name1.insert_one(data)
    print("Data stored successfully")

    return jsonify({'prediction': prediction})


@app.route('/predict/lungcancer', methods=['POST'])
def predict_lungcancer():
    data = request.json
    print(data)
    Age = data['Age']
    Gender = data['Gender']
    AirPollution = data['AirPollution']
    Smoking = data['Smoking']
    Fatigue = data['Fatigue']
    WeightLoss = data['WeightLoss']
    ShortnessofBreath = data['ShortnessofBreath']
    Wheezing = data['Wheezing']
    SwallowingDifficulty = data['SwallowingDifficulty']
    ClubbingofFingerNails = data['ClubbingofFingerNails']
    FrequentCold = data['FrequentCold']
    DryCough = data['DryCough']

    prediction = classifier2.predict([[Age, Gender, AirPollution, Smoking, Fatigue, WeightLoss, ShortnessofBreath,
                                        Wheezing, SwallowingDifficulty, ClubbingofFingerNails, FrequentCold, DryCough]])

    if prediction[0] == 0:
        prediction = "Low"
    elif prediction[0] == 1:
        prediction = "Medium"
    else:
        prediction = "High"

    data['Result'] = prediction

    collection_name2.insert_one(data)
    print("Data stored successfully")

    return jsonify({'prediction': prediction})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
