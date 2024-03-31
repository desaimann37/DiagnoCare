import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CButton } from '@coreui/react';
import PdfDocument from './PdfDocument';
import axios from "axios";

function SendAccurateRec() {
  const [message, setMessage] = useState('');
  const location = useLocation();

  // Extract patient email from URL query parameter
  const searchParams = new URLSearchParams(location.search);
  const patientEmail = searchParams.get('patient_email');
    const doctorEmail = 'desaimann37@gmail.com';
  // Handle message change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle sending email
  const handleSendEmail = async (pdfData) => {
    try {
      // Create form data object
      const formData = new FormData();
      formData.append('pdf', pdfData); // Use the provided pdfData instead of generating from PdfDocument()
      formData.append('to', patientEmail);
      formData.append('from', doctorEmail);
      formData.append('subject', 'Recommendation');
      formData.append('body', message);

      // Send POST request to backend endpoint
      const response = await axios.post(
        "http://127.0.0.1:5000/send-recommendation",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      console.log(response.data); // Log response data for debugging

      // Check if the response indicates success
      if (response.data.message === 'Email sent successfully') {
        console.log('Email sent successfully');
        alert('Email sent successfully');
        window.location.href='/doctor'
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
      <CButton color="primary" onClick={() => handleSendEmail(PdfDocument())}>
        Send Email
      </CButton>
    </div>
  );
}

export default SendAccurateRec;
