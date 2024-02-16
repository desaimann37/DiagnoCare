def indivisual_serial1(diabetes) -> dict:
    return {
        "id": str(diabetes["_id"]),
        "HighBP" : diabetes['HighBP'],
        "HighChol" : diabetes['HighChol'],
        "CholCheck" : diabetes['CholCheck'],
        "BMI" : diabetes['BMI'],
        "Stroke" : diabetes['Stroke'],
        "HeartDiseaseorAttack" : diabetes['HeartDiseaseorAttack'],
        "Sex" : diabetes['Sex'],
        "Age" : diabetes['Age'],
        "Result" : diabetes["Result"]
    }

def list_serial1(diabetes_objects) -> list :
    return[indivisual_serial1(diabetes) for diabetes in diabetes_objects],

def indivisual_serial2(lungcancer) -> dict:
    return {
        "Age" : lungcancer['Age'],
        "Gender" : lungcancer['Gender'],
        "AirPollution" : lungcancer['AirPollution'],
        "Smoking"  : lungcancer['Smoking'],
        "Fatigue" : lungcancer['Fatigue'],
        "WeightLoss" : lungcancer['WeightLoss'],
        "ShortnessofBreath" : lungcancer['ShortnessofBreath'],
        "Wheezing" : lungcancer['Wheezing'],
        "SwallowingDifficulty" : lungcancer['SwallowingDifficulty'],
        "ClubbingofFingerNails" : lungcancer['ClubbingofFingerNails'],
        "FrequentCold" : lungcancer['FrequentCold'],
        "DryCough" : lungcancer['DryCough'],
        "Result" : lungcancer["Result"]
    }

def list_serial2(lungcancer_objects) -> list :
    return[indivisual_serial2(lungcancer) for lungcancer in lungcancer_objects],
