// DoctorDetail.jsx

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import "./doctorDetail.css";

const DoctorDetail = () => {
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

  const handleSubmitFeedback = () => {
    console.log("Selected Stars:", selectedStars);
    console.log("Review Text:", reviewText);
    setSelectedStars(0);
    setReviewText("");
  };

  // Dummy array of doctors
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      Bio: "I am a Cardiologist",
      image:
        "https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg",
      specialty: "Cardiologist",
      rating: 4.5,
      price: 400,
      availableSlots: [
        { day: "Monday", timing: "4:30pm-7:30pm" },
        { day: "Wednesday", timing: "5:00pm-8:00pm" },
      ],
      about:
        "Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.",
      education: [
        { year: "2008-2010", degree: "BSc degree in Neuroscience" },
        { year: "2010-2014", degree: "PhD in Cardiology" },
      ],
      experience: [
        {
          year: "2003-2004",
          position: "Intern",
          location: "New York Hospital",
        },
        {
          year: "2004-2006",
          position: "Resident",
          location: "Boston Medical Center",
        },
      ],
      reviews: [
        {
          userName: "Alice",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "June 27, 2023",
          text: "Great doctor!",
        },
        {
          userName: "Bob",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "July 5, 2023",
          text: "Very knowledgeable.",
        },
      ],
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      Bio: "I am a Cardiologist",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
      specialty: "Pediatrician",
      rating: 4.8,
      price: 400,
      availableSlots: [
        { day: "Monday", timing: "4:30pm-7:30pm" },
        { day: "Wednesday", timing: "5:00pm-8:00pm" },
      ],
      about:
        "Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.",
      education: [
        { year: "2008-2010", degree: "BSc degree in Neuroscience" },
        { year: "2010-2014", degree: "PhD in Cardiology" },
      ],
      experience: [
        {
          year: "2003-2004",
          position: "Intern",
          location: "New York Hospital",
        },
        {
          year: "2004-2006",
          position: "Resident",
          location: "Boston Medical Center",
        },
        {
          year: "2004-2006",
          position: "Resident",
          location: "Boston Medical Center",
        },
        {
          year: "2004-2006",
          position: "Resident",
          location: "Boston Medical Center",
        },
      ],
      reviews: [
        {
          userName: "Alice",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "June 27, 2023",
          text: "Great doctor!",
          rating: 5,
        },
        {
          userName: "Bob",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "July 5, 2023",
          text: "Very knowledgeable.",
          rating: 5,
        },
        {
          userName: "Eve",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "July 5, 2023",
          text: "Very knowledgeable.",
          rating: 3,
        },
      ],
    },
    {
      id: 3,
      name: "Dr. Michael Johnson",
      Bio: "I am a Cardiologist",
      image:
        "https://t4.ftcdn.net/jpg/01/37/44/03/240_F_137440378_5mMBNu4Xyxaj25zD8Ag8NQWsOkYKDeq8.jpg",
      specialty: "Dermatologist",
      rating: 4.3,
      price: 400,
      availableSlots: [
        { day: "Monday", timing: "4:30pm-7:30pm" },
        { day: "Wednesday", timing: "5:00pm-8:00pm" },
      ],
      about:
        "Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.",
      education: [
        { year: "2008-2010", degree: "BSc degree in Neuroscience" },
        { year: "2010-2014", degree: "PhD in Cardiology" },
      ],
      experience: [
        {
          year: "2003-2004",
          position: "Intern",
          location: "New York Hospital",
        },
        {
          year: "2004-2006",
          position: "Resident",
          location: "Boston Medical Center",
        },
      ],
      reviews: [
        {
          userName: "Alice",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "June 27, 2023",
          text: "Great doctor!",
        },
        {
          userName: "Bob",
          userPhoto:
            "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
          date: "July 5, 2023",
          text: "Very knowledgeable.",
        },
      ],
    },
    {
      id: 4,
      name: "Dr. Michael Johnson",
      Bio: "I am a Cardiologist",
      image:
        "https://t4.ftcdn.net/jpg/01/37/44/03/240_F_137440378_5mMBNu4Xyxaj25zD8Ag8NQWsOkYKDeq8.jpg",
      specialty: "Dermatologist",
      rating: 4.3,
      price: 440,
      availableSlots: [
        { day: "Monday", timing: "4:30pm-7:30pm" },
        { day: "Wednesday", timing: "5:00pm-8:00pm" },
      ],
      about:
        "Dr. John Doe is a highly experienced Cardiologist with expertise in treating various heart conditions.",
      education: [
        { year: "2008-2010", degree: "BSc degree in Neuroscience" },
        { year: "2010-2014", degree: "PhD in Cardiology" },
      ],
      experience: [
        {
          year: "2003-2004",
          position: "Intern",
          location: "New York Hospital",
        },
        {
          year: "2004-2006",
          position: "Resident",
          location: "Boston Medical Center",
        },
      ],
      reviews: [
        {
          userName: "Alice",
          userPhoto: "profile-photo.jpg",
          date: "June 27, 2023",
          text: "Great doctor!",
        },
        {
          userName: "Bob",
          userPhoto: "profile-photo.jpg",
          date: "July 5, 2023",
          text: "Very knowledgeable.",
        },
      ],
    },
  ];

  // Find the doctor with the specified id
  const doctor = doctors.find((doctor) => doctor.id === parseInt(id));

  // If doctor is not found, display a message
  if (!doctor) {
    return <div className="doctor-detail">Doctor not found</div>;
  }

  return (
    <>
      <div className="doctor-margin">
        <div className="doctor-detail">
          <div className="doctor-info-container">
            <img src={doctor.image} alt="Doctor" className="doctor-image" />
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
                Specialaization in {doctor.specialty}
              </p>
            </div>
          </div>
          <div className="booking-appointment-card">
            <h4 className="booking-price">
              Booking Price: <span>₹{doctor.price}</span>
            </h4>
            <br />
            <h5>Available Time Slots:</h5>
            <ul>
              {doctor.availableSlots.map((slot, index) => (
                <li className="booking-price" key={index}>
                  {slot.day}: <span>{slot.timing}</span>
                </li>
              ))}
            </ul>
            <button className="book-appointment-button">
              Book Appointment
            </button>
          </div>
        </div>

        {/* ---About and Feedback-- */}
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
          {console.log(activeSection)}
          {activeSection == "about" ? (
            <div className="about-section">
              <br />
              <h2>
                About <span>{doctor.name}</span>
              </h2>
              <br />
              <p>{doctor.about}</p>

              <br />
              <h2>Education</h2>
              <br />
              <ul>
                {doctor.education.map((edu, index) => (
                  <li key={index}>
                    <span>{edu.year}</span>
                    <br />
                    {edu.degree}
                    <br />
                    <br />
                  </li>
                ))}
              </ul>

              <div className="experience-section">
                <h3>Experience</h3>
                <div className="experience-cards">
                  {doctor.experience.map((exp, index) => (
                    <div className="experience-card" key={index}>
                      <h5>
                        <span>{exp.year}</span>
                      </h5>
                      <h5>{exp.position}</h5>
                      <p>{exp.location}</p>
                    </div>
                  ))}
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
