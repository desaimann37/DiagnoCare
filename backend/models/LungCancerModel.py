from pydantic import BaseModel #provides user friendly errors when data is invalid.

class LungCancerModel(BaseModel):
    Age : int
    Gender : int
    AirPollution  : int
    Smoking : int
    Fatigue : int
    WeightLoss : int
    ShortnessofBreath  : int
    Wheezing : int
    SwallowingDifficulty : int
    ClubbingofFingerNails  : int
    FrequentCold : int
    DryCough : int
    