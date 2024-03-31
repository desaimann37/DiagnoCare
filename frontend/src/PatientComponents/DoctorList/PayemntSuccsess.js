import React, { useEffect } from "react";
import paymentSuccsess from "../../assets/payment-succsess.jpg";
import axios from 'axios';
import { useParams } from "react-router-dom";

const PaymentSuccess = () => {
  const { id } = useParams();

  const redirectToHome = () => {
    window.location.href = "patient";
  };

  useEffect(() => {
    const sendPaymentConfirmationMail = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        // Get doctor's data
        const res = await axios.post(
          "https://ishapaghdal-DiagnoCare.hf.space/doctor/one_doctor",
          { doctor_id: id }, 
          config
        );
        
        const doctor = res.data;

        // Book appointment
        const appointmentResponse = await axios.post(
          "https://ishapaghdal-DiagnoCare.hf.space/appointment/add",
          {
            doctor_id: id,
            price: doctor.price,
          },
          config
        );
        
        const appointmentId = appointmentResponse.data.appointment_id; // Extract appointment ID

        // Send payment confirmation mail
        const response = await axios.post(
          "http://localhost:5000/payment/payment_confirmation_mail",
          {
            doctor_name: doctor.name,
            doctor_email: doctor.email,
            appointment_id: appointmentId, 
          },
          config
        );
      } catch (error) {
        console.error("Error sending payment confirmation mail:", error);
      }
    };

    sendPaymentConfirmationMail();
  }, []); 

  return (
    <div style={styles.container}>
        <h1 style={styles.title}>Payment Successful!</h1>
      <p style={styles.message}>Thank you for your payment.</p>
      <button style={styles.button} onClick={redirectToHome}>
        Go to Homepage
      </button>
      <img style={styles.img} src={paymentSuccsess} alt="" />
      
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "100vh",
  },
  title: {
    color: "var(--black)",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  message: {
    color: "#073b4c", // Dark blue
    fontSize: "1.2rem",
    marginBottom: "2rem",
  },
  button: {
    padding: "0.8rem 2rem",
    fontSize: "1rem",
    backgroundColor: "#2ca58d", // Green
    color: "#ffffff", // White
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  img : {
    width: "800px"
  }
};

export default PaymentSuccess;
