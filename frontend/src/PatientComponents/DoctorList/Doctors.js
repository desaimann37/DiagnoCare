import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import axios from 'axios'; 
import './doctors.css'

const Doctors = ({ history }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    // Function to fetch doctors data
    const fetchDoctors = async () => {
      try {
        // Make GET request to your API endpoint
        const response = await axios.get(
          "http://127.0.0.1:5000/doctor/doctors",
          config
        );
        
        // Set the fetched data to the state
        console.log((response.data));
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    // Call the fetchDoctors function when the component mounts
    fetchDoctors();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  // const handleDoctorClick = (id) => {
  //   history.push(`/${id}`);
  // };

  return (
    <div className="doctors-container">
      {doctors.map(doctor => (
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
      ))}
    </div>
  );
};

export default Doctors;
