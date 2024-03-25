import React from 'react';
import './doctors.css';
import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';

const Doctors = ({ history }) => {
  // Temporary array of doctors
  const doctors = [
    {
      id: 1,
      name: 'Dr. John Doe',
      Bio: 'I am a Cardiologist',
      image: 'https://www.shutterstock.com/image-photo/profile-photo-attractive-family-doc-600nw-1724693776.jpg',
      specialty: 'Cardiologist',
      rating: 4.5,
      price: 400
    },
    {
      id: 2,
      name: 'Dr. Jane Smith',
      Bio: 'I am a Cardiologist',
      image: 'https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      specialty: 'Pediatrician',
      rating: 4.8,
      price: 400
    },
    {
      id: 3,
      name: 'Dr. Michael Johnson',
      Bio: 'I am a Cardiologist',
      image: 'https://t4.ftcdn.net/jpg/01/37/44/03/240_F_137440378_5mMBNu4Xyxaj25zD8Ag8NQWsOkYKDeq8.jpg',
      specialty: 'Dermatologist',
      rating: 4.3,
      price: 400
    },
    {
      id: 4,
      name: 'Dr. Michael Johnson',
      Bio: 'I am a Cardiologist',
      image: 'https://t4.ftcdn.net/jpg/01/37/44/03/240_F_137440378_5mMBNu4Xyxaj25zD8Ag8NQWsOkYKDeq8.jpg',
      specialty: 'Dermatologist',
      rating: 4.3,
      price: 400
    },
  ];

  const handleDoctorClick = (id) => {
    history.push(`/${id}`);
  };

  return (
    <div className="doctors-container">
      {doctors.map(doctor => (
        <Link to={`${doctor.id}`} key={doctor.id}>
          <div className="doctorCard" >
            <img className="courseImg" src={doctor.image} alt="courseImg"></img>
            <h3>{doctor.name}</h3>
            {/* <p>{doctor.Bio}</p> */}
            <div className="bestsellerBadge">{doctor.specialty}</div>
            <div className="ratingDiv">
              <span className="rating">{doctor.rating}
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarRoundedIcon />
                <StarHalfRoundedIcon />
              </span>
              {/* <span className="noOfDoctors">{doctor.rating}</span> */}
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
