import React from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from "@coreui/react";

const Appointments = () => {
  // Temporary patient array
  const patients = [
    {
      id: 1,
      name: "John Doe",
      gender: "Male",
      paymentStatus: "Paid",
      price: "$200",
      bookingDate: "2024-03-09",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      gender: "Female",
      paymentStatus: "Paid",
      price: "$150",
      bookingDate: "2024-03-08",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
    {
      id: 3,
      name: "Alex Johnson",
      gender: "Male",
      paymentStatus: "Not Paid",
      price: "$100",
      bookingDate: "2024-03-07",
      image:
        "https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg",
    },
  ];

  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Avatar</CTableHeaderCell>
          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
          <CTableHeaderCell scope="col">Payment Status</CTableHeaderCell>
          <CTableHeaderCell scope="col">Price</CTableHeaderCell>
          <CTableHeaderCell scope="col">Booking Date</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {patients.map(patient => (
          <CTableRow key={patient.id}>
            <CTableHeaderCell scope="row">{patient.id}</CTableHeaderCell>
            <CTableDataCell>
              <img src={patient.image} alt={patient.name} className="avatar-container" style={{ width: 50, height: 50 }} />
            </CTableDataCell>
            <CTableDataCell>{patient.name}</CTableDataCell>
            <CTableDataCell>{patient.gender}</CTableDataCell>
            <CTableDataCell>{patient.paymentStatus}</CTableDataCell>
            <CTableDataCell>{patient.price}</CTableDataCell>
            <CTableDataCell>{patient.bookingDate}</CTableDataCell>
            
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default Appointments;
