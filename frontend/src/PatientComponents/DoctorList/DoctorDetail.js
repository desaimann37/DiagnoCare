import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import axios from "axios";
import "./doctorDetail.css";
import PacmanLoader from "react-spinners/PacmanLoader";
import CircularProgress from '@mui/material/CircularProgress';
import LoadingPage from "../LoadingPage";

const DoctorDetail = () => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("about");
  const [selectedStars, setSelectedStars] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [file, setFile] = useState(null); // State to store the uploaded file

  const handleSendMail = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://127.0.0.1:5000/send-mail", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Email sent successfully");

      // Navigate to '/loading' after email is sent
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        "https://ishapaghdal-DiagnoCare.hf.space/payment/create-checkout-session",
        doctor,
        config
      );
      console.log(response);
      const { session } = response.data;
      setSessionId(session);

      console.log(response.data.session);
      window.location.href = session.url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  const handleGiveFeedback = () => {
    setShowFeedbackForm(true);
  };

  const handleStarClick = (index) => {
    setSelectedStars(index + 1);
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitFeedback = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const review = {
        doctor_id: id,
        rating: selectedStars,
        review_content: reviewText,
      };
      const response = await axios.post(
        "https://ishapaghdal-DiagnoCare.hf.space/doctor/add_review",
        review,
        config
      );
      setReviewText("");
      setSelectedStars(0);
      if (response.ok) {
        const data = await response.json();
        setReviewText("");
        setSelectedStars(0);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleFileInputChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing.");
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "https://ishapaghdal-DiagnoCare.hf.space/doctor/one_doctor",
          { doctor_id: id },
          config
        );

        setDoctor(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorDetails();
  }, []);

  if (loading) {
    return (
      <>
        <center>
          <LoadingPage />
        </center>
      </>
    );
  }

  return (
    <>
      <div className="doctor-margin">
        <div className="doctor-detail">
          <div className="doctor-info-container">
            
            {(doctor.photo) ? 
              <img
                className="doctor-image"
                style={{width: "300px", height: "300px"}}
                src={`data:image/jpeg;base64,${doctor.photo.$binary.base64}`}
                alt=""
              />: <img className="courseImg" src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp" alt=""/>
          }
            <div className="doctor-info">
              <div className="bestsellerBadge">{doctor.specialization}</div>
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
                    {doctor.rating}({doctor.reviews && doctor.reviews.length})
                  </span>
                </span>
              </div>
              <br />
              <p className="doctor-specialty">
                Specialization in {doctor.specialization}
              </p>
            </div>
          </div>
          <div className="booking-appointment-card">
            <h4 className="booking-price">
              Booking Price: <span>₹{doctor.price}</span>
            </h4>
            <br />
            <h5>Available Time Slots:</h5>
            
            {doctor.timeslots && doctor.timeslots.length !== 0 ? (
              <ul>
                {doctor.timeslots.map((slot, index) => {
                  const date = new Date(slot.date.$date);
                  const day = date.toLocaleDateString("en-US", {
                    weekday: "long",
                  });
                  const timing = `${slot.startTime} - ${slot.endTime}`;

                  return (
                    <li className="booking-price" key={index}>
                      {day}: <span>{timing}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <h6>OPPS! No available time slots</h6>
            )}
            <button
              className="book-appointment-button"
              onClick={handlePayment}
            >
              Book Appointment
            </button>
          </div>
        </div>

         {/* Send Mail Button 
         <center>
          <div className="drop-area" onDrop={handleFileDrop} onDragOver={(e) => e.preventDefault()}>
            <input type="file" onChange={handleFileInputChange} />
            <button className="btn-primary btn" onClick={handleSendMail}>
              <h2>Send Mail</h2>
            </button>
          </div>
        </center>
        */}
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
          {activeSection === "about" ? (
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

              <ul>
                {doctor.qualifications &&
                  doctor.qualifications.map((edu, index) => {
                    const startDate = new Date(edu.startDate.$date);
                    const endDate = new Date(edu.endDate.$date);
                    const startYear = startDate.getFullYear();
                    const endYear = endDate.getFullYear();

                    return (
                      <li key={index}>
                        <span>
                          {startYear} - {endYear}
                        </span>
                        <br />
                        {edu.degree}
                        <br />
                        {edu.university}
                        <br />
                        <br />
                      </li>
                    );
                  })}
              </ul>

              <div className="experience-section">
                <h3>Experience</h3>
                <div className="experience-cards">
                  {doctor.experiences && doctor.experiences.length !== 0 ? (
                    doctor.experiences.map((exp, index) => {
                      const startDate = new Date(exp.startDate.$date);
                      const endDate = new Date(exp.endDate.$date);
                      const startYear = startDate.getFullYear();
                      const endYear = endDate.getFullYear();
                      return (
                        <div className="experience-card" key={index}>
                          <h5>
                            <span>
                              {startYear} - {endYear}
                            </span>
                          </h5>
                          <h5>{exp.position}</h5>
                          <p>{exp.location}</p>
                        </div>
                      );
                    })
                  ) : (
                    <h6>No experience yet</h6>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="feedback-section">
                <h3>
                  All Reviews ({doctor.reviews && doctor.reviews.length})
                </h3>
                {doctor.reviews &&
                  doctor.reviews.map((review, index) => (
                    <div className="review" key={index}>
                      <div className="user-profile">
                        <img
                          src={`data:image/jpeg;base64,${review.patient_photo.$binary.base64}`}
                          alt="User"
                          className="user-photo"
                        />
                      </div>
                      <div className="review-details">
                        <h4 className="user-name">{review.patient_name}</h4>
                        <p className="review-date">
                          {review.review_date.$date}
                        </p>
                        <div className="rating">
                          {Array.from({ length: review.rating }, (_, i) => (
                            <StarRoundedIcon key={i} />
                          ))}
                        </div>
                        <br />
                        <p className="review-text">{review.review_content}</p>
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