from flask import Flask, request, jsonify
from flask_cors import CORS
import razorpay

app = Flask(__name__)
CORS(app)

client = razorpay.Client(auth=('YOUR_RAZORPAY_KEY', 'YOUR_RAZORPAY_SECRET'))

@app.route('/create-order', methods=['POST'])
def create_order():
    amount = request.json.get('amount')
    order = client.order.create({'amount': amount, 'currency': 'INR', 'payment_capture': '1'})
    return jsonify(order)

if __name__ == '__main__':
    app.run(debug=True)
