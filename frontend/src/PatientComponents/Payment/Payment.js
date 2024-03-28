import React, { useState } from "react";
import axios from "axios";

const PaymentButton = () => {
  const [sessionId, setSessionId] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/create-checkout-session",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const { session} = response.data;
      setSessionId(session);

      console.log(response.data.session);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentButton;
