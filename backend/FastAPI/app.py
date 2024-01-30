#Library imports
import uvicorn # To work with ASGI
from fastapi import FastAPI
import pickle
from fastapi.middleware.cors import CORSMiddleware
from DiabetesModel import DiabetesModel

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

#Load trained model
pickle_in = open("Diabetes.pkl","rb")
classifier = pickle.load(pickle_in)

@app.get('/')
def index():
    return {'message': 'Hello, World'}

#Post api to make predictions
@app.post('/predict/')
def predict_diabetes(data:DiabetesModel):
    print(data)
    data = data.model_dump()
    
    HighBP = data['HighBP']
    HighChol = data['HighChol']
    CholCheck = data['CholCheck']
    BMI = data['BMI']
    Stroke = data['Stroke']
    HeartDiseaseorAttack = data['HeartDiseaseorAttack']
    Sex = 0
    Age = data['Age']

    print(classifier.predict([[HighBP, HighChol, CholCheck, BMI, Stroke, HeartDiseaseorAttack, Sex, Age]]))
    prediction = classifier.predict([[HighBP, HighChol, CholCheck, BMI, Stroke, HeartDiseaseorAttack, Sex, Age]])

    if(prediction[0] == 0):
        prediction = "No Diabetes"   

    elif(prediction[0] == 1):
        prediction = "Pre Diabetes"
    
    else:
        prediction = "Diabetes"

    return {
        'prediction': prediction
    }  


#Run the API with uvicorn on port 8000
if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8000)                      
    
