import React from 'react';
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import AppointmentIcon from '@mui/icons-material/CalendarToday';
import PaymentIcon from '@mui/icons-material/Payment';
import MeetingIcon from '@mui/icons-material/MeetingRoom';
import ReviewIcon from '@mui/icons-material/Star';
import ChatIcon from '@mui/icons-material/Chat';
import ConsultationIcon from '@mui/icons-material/ContactSupport';
import EmailIcon from '@mui/icons-material/Email';

const Home2 = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setLoaded(true);
    }, []);
  
    return (
      <div className="home2-container">
        <div className="home2-center-content">
          {loaded && (
            <div className="home2-animated-text">
              <br />
              <br />
              <br />
              <h1>
                Explore Our <span>Services</span>
              </h1>
              <br />
              <div className="home2-content-wrapper">
                <p>
                  DiagnoCare offers a range of services to empower you in managing your health effectively.
                </p>
                <br />
                <br />
              </div>
            </div>
          )}
        </div>
        <div className="home2-row">
          <div className="home2-column">
            <div className="home2-icon-container">
              <SearchIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Search Doctor</h1>
              <p>
                Find doctors based on specialty and rating.
              </p>
            </div>
          </div>
          <div className="home2-column">
            <div className="home2-icon-container">
              <AppointmentIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Book Appointment</h1>
              <p>
                Book appointments with doctors conveniently online.
              </p>
            </div>
          </div>
          <div className="home2-column">
            <div className="home2-icon-container">
              <PaymentIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Payment</h1>
              <p>
                Make secure payments for doctor appointments.
              </p>
            </div>
          </div>
          <div className="home2-column">
            <div className="home2-icon-container">
              <MeetingIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Online Appointment</h1>
              <p>
                Join online consultations with doctors after booking and payment.
              </p>
            </div>
          </div>
        </div>
        <div className="home2-row">
          <div className="home2-column">
            <div className="home2-icon-container">
              <ReviewIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Doctor Reviews</h1>
              <p>
                Review and rate doctors based on your experiences.
              </p>
            </div>
          </div>
          <div className="home2-column">
            <div className="home2-icon-container">
              <ChatIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Healthcare Chatbot</h1>
              <p>
                Chat with our healthcare bot to receive health recommendations.
              </p>
            </div>
          </div>
          <div className="home2-column">
            <div className="home2-icon-container">
              <ConsultationIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Accurate Consultation</h1>
              <p>
                Get accurate and personalized consultations from doctors.
              </p>
            </div>
          </div>
          <div className="home2-column">
            <div className="home2-icon-container">
              <EmailIcon sx={{ color: "#006ef7", fontSize: 30 }} />
            </div>
            <div className="home2-content">
              <h1>Confirmation Email</h1>
              <p>
                Receive confirmation emails after booking doctor appointments.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Home2;
