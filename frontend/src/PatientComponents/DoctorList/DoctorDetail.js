import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import axios from "axios";
import './doctorDetail.css'
import PacmanLoader from "react-spinners/PacmanLoader";
import LoadingPage from "../LoadingPage";


const DoctorDetail = () => {
  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("about");
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const handleGiveFeedback = () => {
    setShowFeedbackForm(true);
  };

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSendMail = async () => {
    try {
      setLoading(true);
      await axios.get("http://127.0.0.1:5000/send-mail");
      alert("Email sent successfully");

      // Navigate to '/loading' after email is sent
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = () => {
    console.log("Selected Stars:", selectedStars);
    console.log("Review Text:", reviewText);
    setSelectedStars(0);
    setReviewText("");
  };

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing.");
          return;
        }
        const response = await axios.get(
          'http://127.0.0.1:5000/doctor/doctors', {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorDetails();
  }, []);

  if (loading) {
    return <><center><LoadingPage /></center></>
  }

  const doctor = doctors.find((doctor) => doctor.doctor_id === id);
  if (!doctor) {
    return <div className="doctor-detail">Doctor not found</div>;
  }

  return (
    <>
      <div className="doctor-margin">
        <div className="doctor-detail">
          <div className="doctor-info-container">
          <img className="doctor-image" src={`data:image/jpeg;base64,${doctor.photo.$binary.base64}`} alt="Doctor Image"/>
            <div className="doctor-info">
              <div className="bestsellerBadge">{doctor.specialty}</div>
              <h3 className="doctor-name">{doctor.name}</h3>
              <div className="ratingDiv">
                <span className="doctor-rating">
                  <StarRoundedIcon style={{ fontSize: "28px" }} />
                  <span
                    style={{
                      fontSize: "17px",
                      fontWeight: 450,
                      marginTop: "7px",
                      color: "black",
                    }}
                  >
                    {" "}
                    {doctor.rating} (2)
                  </span>
                </span>
              </div>
              <br />
              <p className="doctor-specialty">
                Specialaization in {doctor.specification}
              </p>
            </div>
          </div>
          <div className="booking-appointment-card">
            <h4 className="booking-price">
              Booking Price: <span>₹{doctor.ticketPrice}</span>
            </h4>
            <br />
            <h5>Available Time Slots:</h5>
            {doctor.availableSlots && (
            <ul>
              {doctor.timeslots && (
              <ul>
                {doctor.timeslots.map((slot, index) => (
                  <li className="booking-price" key={index}>
                    {slot}
                  </li>
                ))}
              </ul>
            )}
            </ul>
          )}
            <button className="book-appointment-button">
              Book Appointment
            </button>
          </div>
        </div>

        <center><button onClick={handleSendMail}><h2>Send Mail</h2></button></center>
        
        <br />
        <div className="doctor-nav">
          <div
            className={`nav-item ${activeSection === "about" ? "active" : ""}`}
            onClick={() => setActiveSection("about")}
          >
            About
          </div>
          <div
            className={`nav-item ${
              activeSection === "feedback" ? "active" : ""
            }`}
            onClick={() => setActiveSection("feedback")}
          >
            Feedback
          </div>
        </div>
        <div className="nav-line"></div>

        <div className="doctor-section">
          {activeSection == "about" ? (
            <div className="about-section">
              <br />
              <h2>
                About <span>{doctor.name}</span>
              </h2>
              <br />
              <p>{doctor.about}</p>

              <br />
              <h2>Qualification</h2>
              <br />
              {doctor.qualifications && (
              <ul>
                {doctor.qualifications.map((qualification, index) => (
                  <li key={index}>
                    {qualification}
                  </li>
                ))}
              </ul>
            )}

              <div className="experience-section">
                <h3>Experience</h3>
                <div className="experience-cards">
                {doctor.experience && (
                <div className="experience-card">
                  <h5>
                    <span>{doctor.experience}</span>
                  </h5>
                </div>
              )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="feedback-section">
                <h3>All Reviews ({doctor.reviews.length})</h3>
                {doctor.reviews.map((review, index) => (
                  <div className="review" key={index}>
                    <div className="user-profile">
                      <img
                        src={review.userPhoto}
                        alt="User"
                        className="user-photo"
                      />
                    </div>
                    <div className="review-details">
                      <h4 className="user-name">{review.userName}</h4>
                      <p className="review-date">{review.date}</p>
                      <div className="rating">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <StarRoundedIcon key={i} />
                        ))}
                      </div>
                      <br />
                      <p className="review-text">{review.text}</p>
                    </div>
                    <br />
                  </div>
                ))}
                <button
                  className="give-feedback-button"
                  onClick={handleGiveFeedback}
                >
                  Give Feedback
                </button>
              </div>
              {showFeedbackForm && (
                <div className="feedback-form">
                  <div className="star-rating">
                    {[...Array(5)].map((_, index) => (
                      <StarRoundedIcon
                        key={index}
                        onClick={() => handleStarClick(index)}
                        className={index < selectedStars ? "selected" : ""}
                      />
                    ))}
                  </div>
                  <textarea
                    value={reviewText}
                    onChange={handleReviewChange}
                    placeholder="Write your review..."
                  ></textarea>
                  <button
                    className="submit-feedback-button"
                    onClick={handleSubmitFeedback}
                    >
                    Submit Feedback
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorDetail;    
  