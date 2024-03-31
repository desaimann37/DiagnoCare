import React from 'react';
import { useState, useEffect } from "react";
import patientImage from "../../assets/desktop.png";

const Home3 = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setLoaded(true);
    }, []);
  
    return (
      <div className="home3-container">
        <div className="home3-image-container">
          <img src={patientImage} alt="Your Image" />
        </div>
        <div className="home3-text-container">
          {loaded && (
            <div className="home3-animated-text">
              <h1>
                Get Started Easily
              </h1>
              <br />
              <h3>01. Register</h3>
              <p className="home3-big-font">
                Create an account by providing all the necessary details.
              </p><br/>
              <h3>02. Search Doctor</h3>
              <p className="home3-big-font">
                Find and select a doctor suitable for your diagnosis.
              </p><br/>
              <h3>03. Book Appointment</h3>
              <p className="home3-big-font">
                Book an appointment with the selected doctor for consultation.
              </p><br/>
              <h3>04. Make Payment</h3>
              <p className="home3-big-font">
                Make secure payments for the appointment using our payment gateway.
              </p><br/>
              <h3>05. Join Online Consultation</h3>
              <p className="home3-big-font">
                Join the scheduled online consultation with your doctor.
              </p><br/>
              <h3>06. Receive Confirmation</h3>
              <p className="home3-big-font">
                Receive confirmation of your appointment via email.
              </p><br/>
            </div>
          )}
        </div>
      </div>
    );
}

export default Home3;
