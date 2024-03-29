import axios from "axios";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import "./overview.css";
import React, { useEffect, useState } from "react";
import LoadingPage from "../../PatientComponents/LoadingPage";


const Overview = () => {
  const [doctors, setDoctors] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token is missing.");
          return;
        }
        const response = await axios.get(
          "http://127.0.0.1:5000/doctor/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorDetails();
  }, []);
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

   if (loading) {
    return (
      <>
        <center>
          <LoadingPage/>
        </center>
      </>
    );
  }

  return (
    <div className="overview-container">
      <div className="overview-horizontal-container">
        <div className="overview-left">
          <img
            src={`data:image/jpeg;base64,${doctors.photo.$binary.base64}`}
            alt="Doctor"
            className="overview-doctor-image"
          />
        </div>
        <div className="overview-right">
         <h2>{doctors.name}</h2>
          <p>
            <span className="specialty">{doctors.specialization}</span>
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
                {doctors.rating} (reviews)
              </span>
            </span>
          </div>
          <br />
          <div className="overview-bio">
            <p>{doctors.bio}</p>
          </div>
        </div>
      </div>
      <div className="overview-vertical-container">
        <div className="about-section">
          <br />
          <h2>
            About <span>{doctors.name}</span>
          </h2>
          <br />
          <p>{doctors.about}</p>

          <br />
          <h2>Education</h2>
          <br />
          <ul>
                {doctors.qualifications && doctors.qualifications.map((edu, index) => {
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
            {doctors.experiences && doctors.experiences.map((exp, index) => {
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
                  })}
            </div>
          </div>

          <h3>All Reviews ({doctors.reviews && doctors.reviews.length})</h3>
          <div className="feedback-section scrollable-reviews">
                
                {doctors.reviews && doctors.reviews.map((review, index) => (
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
                      <p className="review-date">{formatDate(review.review_date.$date)}</p>
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
              </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
