import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';

const PaymentForm = () => {
  const handlePayment = async () => {
    // Call backend to create order
    const response = await fetch('http://127.0.0.1:4040/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Pass amount as needed
    });
    const data = await response.json();

    // Redirect to Razorpay checkout
    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: data.amount,
      currency: 'INR',
      order_id: data.id,
      name: 'Your Company Name',
      description: 'Product description',
      image: 'https://example.com/logo.png', // Add your logo URL
      handler: function (response) {
        console.log(response);
      },
    };
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay with Razorpay</button>
    </div>
  );
};

export default PaymentForm;
