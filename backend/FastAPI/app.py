#Library imports
import uvicorn # To work with ASGI
from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware
from models.DiabetesModel import DiabetesModel
from models.LungCancerModel import LungCancerModel
import sklearn
from config.database import collection_name1, collection_name2
from bson import ObjectId #Used by mongodb to identify id created by itself
from schema.schemas import list_serial1, list_serial2


#Create the app object
app = FastAPI() 

origins = [
    'http://localhost:3000',
    'http://192.168.1.25:3000', 
    
]



app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True ,
    allow_methods = ['*'],
    allow_headers = ['*'],
  

)

print('The scikit-learn version is {}.'.format(sklearn.__version__))

#Load trained model
pickle_diabetes= open("pklFiles/Diabetes.pkl","rb")
classifier1 = pickle.load(pickle_diabetes)

pickle_lung_cancer = open("pklFiles/LungCancer.pkl","rb")
classifier2 = pickle.load(pickle_lung_cancer)

@app.get('/get/diabetes')
async def get_diabetes_objects():
    diabetes_objects = list_serial1(collection_name1.find())
    return diabetes_objects


@app.get('/get/lungcncer')
async def get_lungcancer_objects():
    lungcancer_objects = list_serial2(collection_name2.find())
    return lungcancer_objects

#Post api to make predictions for Diabetes
@app.post('/predict/diabetes')
def predict_diabetes(data:DiabetesModel):
    print(data)
    data = data.model_dump()
    
    HighBP = data['HighBP']
    HighChol = data['HighChol']
    CholCheck = data['CholCheck']
    BMI = data['BMI']
    Stroke = data['Stroke']
    HeartDiseaseorAttack = data['HeartDiseaseorAttack']
    Sex = data['Sex']
    Age = data['Age']

    print(classifier1.predict([[HighBP, HighChol, CholCheck, BMI, Stroke, HeartDiseaseorAttack, Sex, Age]]))
    prediction = classifier1.predict([[HighBP, HighChol, CholCheck, BMI, Stroke, HeartDiseaseorAttack, Sex, Age]])
    

    if(prediction[0] == 0):
        prediction = "No Diabetes"   

    elif(prediction[0] == 1):
        prediction = "Pre Diabetes"
    
    else:
        prediction = "Diabetes"

    data['Result'] = prediction;

    collection_name1.insert_one(data)
    print("Data stored successfully")
    return {
        'prediction': prediction
    }  

#Post api to make predictions for Lung Cancer
@app.post('/predict/lungcancer')
def predict_diabetes(data:LungCancerModel):
    print(data)
    data = data.model_dump()
    
    Age = data['Age']
    Gender = data['Gender']
    AirPollution = data['AirPollution']
    Smoking  = data['Smoking']
    Fatigue = data['Fatigue']
    WeightLoss = data['WeightLoss']
    ShortnessofBreath = data['ShortnessofBreath']
    Wheezing = data['Wheezing']
    SwallowingDifficulty = data['SwallowingDifficulty']
    ClubbingofFingerNails = data['ClubbingofFingerNails']
    FrequentCold = data['FrequentCold']
    DryCough = data['DryCough']

    print(classifier2.predict([[Age, Gender, AirPollution, Smoking, Fatigue, WeightLoss, ShortnessofBreath, Wheezing, SwallowingDifficulty, ClubbingofFingerNails, FrequentCold, DryCough]]))
    prediction = classifier2.predict([[Age, Gender, AirPollution, Smoking, Fatigue, WeightLoss, ShortnessofBreath, Wheezing, SwallowingDifficulty, ClubbingofFingerNails, FrequentCold, DryCough]])

    if(prediction[0] == 0):
        prediction = "Low"   

    elif(prediction[0] == 1):
        prediction = "Medium"
    
    else:
        prediction = "High"

    data['Result'] = prediction;

    collection_name2.insert_one(data)
    print("Data stored successfully")

    return {
        'prediction': prediction
    }  

#Run the API with uvicorn on port 8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)                      
    
