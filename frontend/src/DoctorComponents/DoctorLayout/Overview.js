import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import "./overview.css";

// Temporary doctor object
const doctor = {
  id: 1,
  name: "Dr. John Doe",
  Bio: "I am a Cardiologist",
  image:
    "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
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
};

const Overview = () => {
  return (
    <div className="overview-container">
      <div className="overview-horizontal-container">
        <div className="overview-left">
          <img
            src={doctor.image}
            alt="Doctor"
            className="overview-doctor-image"
          />
        </div>
        <div className="overview-right">
          <h2>{doctor.name}</h2>
          <p>
            <span className="specialty">{doctor.specialty}</span>
          </p>
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
          <div className="overview-bio">
            <p>{doctor.Bio}</p>
          </div>
        </div>
      </div>
      <div className="overview-vertical-container">
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
      </div>
    </div>
  );
};

export default Overview;
