from flask import Flask
from flask_cors import CORS
from auth import auth_bp
from extension import db
# import tensorflow as tf
# from PIL import Image
# import numpy as np
# import io 


# from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)
app.secret_key = 'your_secret_key'
# Mongodb Name : 
print(db.name)


# Register blue_print : 
app.register_blueprint(auth_bp , url_prefix='/auth')


"""
model = tf.keras.models.load_model('../Models/alzheimer2.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['file']

        if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            return jsonify({"error": "Invalid file type. Please upload a valid image."}), 400

        image = Image.open(io.BytesIO(file.read())).convert("RGB").resize((150, 150))
        image_array = np.array(image)
        image_array = image_array.reshape(1, 150, 150, 3)

        prediction = model.predict(image_array)

        categories = ["MildDemented", "ModerateDemented", "NonDemented", "VeryMildDemented"]
        predicted_category = categories[np.argmax(prediction)]

        report = {
            "prediction_category": "predicted_category",
            "precautions": "Include precautions information based on the predicted category.",
            "medicine": "Include medicine information based on the predicted category.",
            "motivation": "Include motivational message based on the predicted category."
        }

        return jsonify(report), 200

    except Exception as e:
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

"""

if __name__ == '__main__':
    app.run(debug=True)
