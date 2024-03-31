import React, { useEffect, useState } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from "@coreui/react";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/appointment/doctor", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const startConsultation = (appointmentId) => {
    window.location.href = `/doctor/meeting?roomID=${appointmentId}`;
  };

  const handleRecommendationClick = (appointment) => {
    const { id, patient_name, price, appointment_date, image, patient_email } = appointment;
    // Redirect to SendAccurateRec component with patient details
    window.location.href = `/doctor/acc-recommendation?patientId=${id}&name=${patient_name}&price=${price}&bookingDate=${appointment_date}&image=${image}&patient_email=${patient_email}`;
  };

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Avatar</CTableHeaderCell>
          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
          <CTableHeaderCell scope="col">Price</CTableHeaderCell>
          <CTableHeaderCell scope="col">Booking Date</CTableHeaderCell>
          <CTableHeaderCell scope="col">Send Recommendation</CTableHeaderCell>
          <CTableHeaderCell scope="col">Join Meeting</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {appointments.map((appointment, index) => (
          <CTableRow key={index}>
            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
            <CTableDataCell>
              <img src={`data:image/jpeg;base64,${appointment.patient_photo}`} alt={appointment.patient_name} className="avatar-container" style={{ width: 50, height: 50 }} />
            </CTableDataCell>
            <CTableDataCell>{appointment.patient_name}</CTableDataCell>
            <CTableDataCell><span style={{ color: "green" }}>Paid</span></CTableDataCell>
            <CTableDataCell>{appointment.price}</CTableDataCell>
            <CTableDataCell>{new Date(appointment.appointment_date).toLocaleDateString()}</CTableDataCell>
            <CTableDataCell>
              <button className="logout-button" onClick={() => handleRecommendationClick(appointment)}>Send Recommendation</button>
            </CTableDataCell>
            <CTableDataCell><button className="logout-button" onClick={() => startConsultation(appointment.appointment_id)}>Start Consultation</button></CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Appointments;
