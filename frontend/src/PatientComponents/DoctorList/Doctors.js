import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import axios from 'axios'; 
import './doctors.css';
import CircularProgress from '@mui/material/CircularProgress';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "https://ishapaghdal-DiagnoCare.hf.space/doctor/doctors",
          config
        );
        
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false); // Set loading state to false once data fetching is completed
      }
    };

    fetchDoctors();
  }, []); 

  return (
    <div className="doctors-container">
      {loading ? ( // Conditional rendering based on loading state
        <div className="loader-container">
          <CircularProgress size={80} /> 
        </div>
      ) : (
        doctors.map(doctor => (
          <Link to={`${doctor._id.$oid}`} key={doctor.doctor_id}>
            <div className="doctorCard">
              <img className="courseImg" src={`data:image/jpeg;base64,${doctor.photo.$binary.base64}`} alt="Doctor Image"/>
              <h3>{doctor.name}</h3>
              <div className="bestsellerBadge">{doctor.specialization}</div>
              <div className="ratingDiv">
                <span className="rating">{doctor.rating}
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                  <StarRoundedIcon />
                  <StarHalfRoundedIcon />
                </span>
              </div>
              <div className="priceAndBadge">
                <h4 className="price">₹{doctor.price}</h4>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default Doctors;
