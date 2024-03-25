import React, { useState, useMemo } from "react";
import "./profile.css";

import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-react-ui-kit";

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

const Profile = () => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [specializationOpen, setSpecializationOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const selectData = useMemo(
    () => [
      { text: "Male", value: "male" },
      { text: "Female", value: "female" },
    ],
    []
  );

  const specializationData = useMemo(
    () => [
      { text: "Cardiologist", value: "cardiologist" },
      { text: "Pediatrician", value: "pediatrician" },
      { text: "Orthopedic Surgeon", value: "orthopedic_surgeon" },
    ],
    []
  );

  const priceData = useMemo(
    () => [
      { text: "$100", value: 100 },
      { text: "$200", value: 200 },
      { text: "$300", value: 300 },
    ],
    []
  );
  return (
    <>
      <div className="profile-title">
        <h2>Profile Information</h2>
      </div>

      <form>
        <MDBRow className="mb-4">
          <label> Name</label>
          <MDBCol>
            <MDBInput id="form6Example1" placeholder="name" />
          </MDBCol>
        </MDBRow>

        <label> Email</label>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput type="email" id="form6Example2" placeholder="Email" />
          </MDBCol>
        </MDBRow>

        <label> Phone</label>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput type="tel" id="form6Example3" placeholder="Phone" />
          </MDBCol>
        </MDBRow>

        <label> Bio</label>
        <MDBRow className="mb-4">
          <MDBCol>
            <MDBInput textarea id="form6Example4" rows={4} placeholder="Bio" />
          </MDBCol>
        </MDBRow>

        <MDBRow className="mb-4">
          <MDBCol>
            <MDBDropdown>
              <MDBDropdownToggle
                color="light"
                onClick={() => setGenderOpen(!genderOpen)}
              >
                Gender
              </MDBDropdownToggle>
              <MDBDropdownMenu show={genderOpen}>
                {selectData.map((item, index) => (
                  <MDBDropdownItem key={index}>{item.text}</MDBDropdownItem>
                ))}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCol>
          <MDBCol>
            <MDBDropdown>
              <MDBDropdownToggle
                color="light"
                onClick={() => setSpecializationOpen(!specializationOpen)}
              >
                Specialization
              </MDBDropdownToggle>
              <MDBDropdownMenu show={specializationOpen}>
                {specializationData.map((item, index) => (
                  <MDBDropdownItem key={index}>{item.text}</MDBDropdownItem>
                ))}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCol>
          <MDBCol>
            <MDBDropdown>
              <MDBDropdownToggle
                color="light"
                onClick={() => setPriceOpen(!priceOpen)}
              >
                Price
              </MDBDropdownToggle>
              <MDBDropdownMenu show={priceOpen}>
                {priceData.map((item, index) => (
                  <MDBDropdownItem key={index}>{item.text}</MDBDropdownItem>
                ))}
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBCol>
        </MDBRow>
        <MDBBtn type="submit" block>
          Submit
        </MDBBtn>
      </form>
    </>
  );
};

export default Profile;
