import os
import stripe
from flask import Flask, jsonify, request, render_template  # Import render_template
from dotenv import load_dotenv
from flask_cors import CORS

app = Flask(__name__)
load_dotenv()
CORS(app)  

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
stripe_keys = {
    "secret_key": os.environ["STRIPE_SECRET_KEY"],
    "publishable_key": os.environ["STRIPE_PUBLISHABLE_KEY"],
}

@app.route("/config")
def get_publishable_key():
    stripe_config = {"publicKey": os.getenv("STRIPE_PUBLISHABLE_KEY")}
    return jsonify(stripe_config)

@app.route("/create-checkout-session", methods=['POST'])
def create_checkout_session():
    domain_url = "http://127.0.0.1:3000/"
    stripe.api_key = stripe_keys["secret_key"]
    try:
        data = request.get_json()
        # Extract customer name and address from request data
        customer_name = 'Isha'
        customer_address = 'XYZ'

        # Create a Checkout Session with customer name and address
        checkout_session = stripe.checkout.Session.create(
            success_url=domain_url + "success?session_id={CHECKOUT_SESSION_ID}",
            cancel_url=domain_url + "/",
            payment_method_types=["card"],
            mode="payment",
            customer_email="ishapaghdal0@gmail.com",
            line_items=[
                {
                    "price_data": {
                        "currency" : 'bdt',
                        "unit_amount" : 10000,
                        "product_data":{
                            "name" : "Dr. Isha",
                            "description" : "Hii I am Isha",
                            "images" : ['https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg'],
                        }
                    },
                    "quantity": 1,
                }
            ],
            billing_address_collection=None
        )
        return jsonify({"session": checkout_session}), 200
    except Exception as e:
        print(e)
        return jsonify(error=str(e)), 403

@app.route("/success")
def success():
    return render_template("success.js")  # Use render_template to render the success template

@app.route("/cancelled")
def cancelled():
    return render_template("cancelled.js")  # Use render_template to render the cancelled template

if __name__ == "__main__":
    app.run(debug=True, port=5000)
