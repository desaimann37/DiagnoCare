import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CButton } from '@coreui/react';
import PdfDocument from './PdfDocument';
import axios from "axios";

function SendAccurateRec() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const patientName = searchParams.get('name');
    // const gender = searchParams.get('gender');
    // const paymentStatus = searchParams.get('paymentStatus');
    const price = searchParams.get('price');
    const bookingDate = searchParams.get('bookingDate');
    const patientEmail = searchParams.get('patient_email');
    const doctorEmail = 'desaimann37@gmail.com';
  
    // Construct message with patient details
    const patientDetails = `Patient Name: ${patientName}\nPrice: ${price}\nBooking Date: ${bookingDate}\nPatient Email: ${patientEmail}\nDoctor Email: ${doctorEmail}`;
    setMessage(patientDetails);
  }, [location.search]);



  // Handle message change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle sending email
  const handleSendEmail = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', PdfDocument(message)); // Pass message directly to PdfDocument
      formData.append('to', message.match(/Patient Email: (.*)\n/)[1]); // Extract patient email from message
      formData.append('from', 'desaimann37@gmail.com');
      formData.append('subject', 'Recommendation');
      formData.append('body', message);

      const response = await axios.post(
        "https://ishapaghdal-DiagnoCare.hf.space/send-recommendation",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      if (response.data.message === 'Email sent successfully') {
        console.log('Email sent successfully');
        alert('Email sent successfully');
        window.location.href='/doctor';
      } else {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={handleMessageChange}
        placeholder="Type your recommendation here..."
        style={{
          width: '100%',
          minHeight: '300px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '10px',
        }}
      />
      <CButton color="primary" onClick={handleSendEmail}>
        Send Email
      </CButton>
    </div>
  );
}

export default SendAccurateRec;
