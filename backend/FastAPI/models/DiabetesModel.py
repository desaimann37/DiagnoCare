from pydantic import BaseModel #provides user friendly errors when data is invalid.

class DiabetesModel(BaseModel):
    HighBP : int
    HighChol : int
    CholCheck : int
    BMI : float
    Stroke : int
    HeartDiseaseorAttack : int
    Sex : int
    Age : int
