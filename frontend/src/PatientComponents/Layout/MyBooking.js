import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import axios from 'axios'; 

const MyBooking = () => {
    const [doctorsWithAppointments, setDoctorsWithAppointments] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const fetchDoctorsWithAppointments = async () => {
            try {
                const response = await axios.get(
                    "https://ishapaghdal-DiagnoCare.hf.space/appointment/patient",
                    config
                );

                setDoctorsWithAppointments(response.data.appointments);
            } catch (error) {
                console.error('Error fetching doctors with appointments:', error);
            }
        };

        fetchDoctorsWithAppointments();
    }, []);

    const startConsultation = (appointmentId) => {
        window.location.href = `/patient/meeting?roomID=${appointmentId}`;
    };

    return (
        <div className="doctors-container">
            {doctorsWithAppointments.map(doctor => (
                <div className="doctorCard" key={doctor.doctor_id}>
                    <Link to={`/patient/doctors/${doctor.doctor_id}`}>
                        <img className="courseImg" src={`data:image/jpeg;base64,${doctor.doctor_photo}`} alt="Doctor Image"/>
                        <h3>{doctor.doctor_name}</h3>
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
                        <div className="appointmentDetails">
                            <p>Appointment booked on: {new Date(doctor.appointment_date).toLocaleString()}</p>
                            <p>Patient Name: {doctor.patient_name}</p>
                            <p>Patient Email: {doctor.patient_email}</p>
                        </div>
                    </Link>
                    <button className="book-appointment-button" onClick={() => startConsultation(doctor.appointment_id)}>Start Consultation</button>
                </div>
            ))}
        </div>
    )
}

export default MyBooking;
