import React, { useState } from "react";
import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CInputGroupText,
  CInputGroup,
  CFormTextarea,
  CFormSelect,
} from "@coreui/react";

import "./profile.css";

const ProfileForm = () => {
  const [qualifications, setQualifications] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [aboutDoctor, setAboutDoctor] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");

  const handleAddQualification = () => {
    setQualifications((prevQualifications) => [
      ...prevQualifications,
      { startDate: "", endDate: "", degree: "", university: "" },
    ]);
  };

  const handleDeleteQualification = (index) => {
    setQualifications((prevQualifications) =>
      prevQualifications.filter((_, i) => i !== index)
    );
  };

  const handleAddExperience = () => {
    setExperiences((prevExperiences) => [
      ...prevExperiences,
      { startDate: "", endDate: "", position: "", location: "" },
    ]);
  };

  const handleDeleteExperience = (index) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((_, i) => i !== index)
    );
  };

  const handleAddTimeSlot = () => {
    setTimeSlots((prevTimeSlots) => [
      ...prevTimeSlots,
      { day: "", startTime: "", endTime: "" },
    ]);
  };

  const handleDeleteTimeSlot = (index) => {
    setTimeSlots((prevTimeSlots) =>
      prevTimeSlots.filter((_, i) => i !== index)
    );
  };

  const handleInputChange = (index, type, e) => {
    const { name, value } = e.target;
    if (type === "qualification") {
      const newQualifications = [...qualifications];
      newQualifications[index][name] = value;
      setQualifications(newQualifications);
    } else if (type === "timeSlot") {
      const newTimeSlots = [...timeSlots];
      newTimeSlots[index][name] = value;
      setTimeSlots(newTimeSlots);
    } else if (type === "about") {
      setAboutDoctor(value);
    } else if (type === "gender") {
      setGender(value);
    } else if (type === "specialization") {
      setSpecialization(value);
    }
  };

  return (
    <CForm className="row g-3">
      <CCol md={6}>
        <CFormInput
          type="text"
          id="inputName"
          label={
            <span>
              Name<span style={{ color: "red", fontSize: "17px" }}>*</span>
            </span>
          }
          placeholder="Full name"
        />
      </CCol>
      <CCol md={6}>
        <CFormInput
          type="email"
          id="inputEmail"
          label={
            <span>
              Email<span style={{ color: "red", fontSize: "17px" }}>*</span>
            </span>
          }
          placeholder="Email Id"
        />
      </CCol>
      <CCol md={6}>
        <CFormInput
          type="tel"
          id="inputPhone"
          label={
            <span>
              Phone<span style={{ color: "red", fontSize: "17px" }}>*</span>
            </span>
          }
          placeholder="Phone number"
        />
      </CCol>
      <CCol xs={6}>
        <CFormInput
          id="inputBio"
          label={
            <span>
              Bio<span style={{ color: "red", fontSize: "17px" }}>*</span>
            </span>
          }
          placeholder="Enter Bio"
        />
      </CCol>

      <CCol md={4}>
        <CFormSelect
          id="inputGender"
          label="Gender"
          onChange={(e) => handleInputChange(0, "gender", e)}
          value={gender}
        >
          <option value="">Choose...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </CFormSelect>
      </CCol>
      <CCol md={4}>
        <CFormSelect
          id="inputSpecialization"
          label="Specialization"
          onChange={(e) => handleInputChange(0, "specialization", e)}
          value={specialization}
        >
          <option value="">Choose...</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Pediatrician">Pediatrician</option>
          <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
        </CFormSelect>
      </CCol>
      <CCol xs={4}>
        <CFormInput
          id="inputPrice"
          label={
            <span>
              Price<span style={{ color: "red", fontSize: "17px" }}>*</span>
            </span>
          }
          placeholder="Enter Price"
        />
      </CCol>

      <CCol md={12}>
        <h5>Qualification*</h5>
      </CCol>

      {qualifications.map((qualification, index) => (
        <React.Fragment key={index}>
          <CCol md={6}>
            <CFormInput
              label="Start Date"
              type="date"
              name="startDate"
              value={qualification.startDate}
              onChange={(e) => handleInputChange(index, "qualification", e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="End Date"
              type="date"
              name="endDate"
              value={qualification.endDate}
              onChange={(e) => handleInputChange(index, "qualification", e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              label="Degree"
              name="degree"
              value={qualification.degree}
              placeholder="Degree"
              onChange={(e) => handleInputChange(index, "qualification", e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="University"
              type="text"
              name="university"
              value={qualification.university}
              placeholder="University"
              onChange={(e) => handleInputChange(index, "qualification", e)}
            />
          </CCol>
          <CCol xs={12}>
            <CButton
              color="danger"
              onClick={() => handleDeleteQualification(index)}
            >
              Delete
            </CButton>
          </CCol>
        </React.Fragment>
      ))}

      <CCol xs={12}>
        <CButton color="primary" onClick={handleAddQualification}>
          Add Qualification
        </CButton>
      </CCol>

      <CCol md={12}>
        <h5>Experience*</h5>
      </CCol>
      {experiences.map((experience, index) => (
        <React.Fragment key={index}>
          <CCol md={6}>
            <CFormInput
              label="Start Date"
              type="date"
              name="startDate"
              value={experience.startDate}
              onChange={(e) => handleInputChange(index, "experience", e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="End Date"
              type="date"
              name="endDate"
              value={experience.endDate}
              onChange={(e) => handleInputChange(index, "experience", e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              label="Position"
              name="position"
              value={experience.position}
              placeholder="Position"
              onChange={(e) => handleInputChange(index, "experience", e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="Location"
              type="text"
              name="location"
              value={experience.location}
              placeholder="Location"
              onChange={(e) => handleInputChange(index, "experience", e)}
            />
          </CCol>
          <CCol xs={12}>
            <CButton
              color="danger"
              onClick={() => handleDeleteExperience(index)}
            >
              Delete
            </CButton>
          </CCol>
        </React.Fragment>
      ))}

      <CCol xs={12}>
        <CButton color="primary" onClick={handleAddExperience}>
          Add Experience
        </CButton>
      </CCol>

      <CCol md={12}>
        <h5>Time Slot*</h5>
      </CCol>
      {timeSlots.map((slot, index) => (
        <React.Fragment key={index}>
          <CCol md={4}>
            <CFormInput
              type="text"
              label="Day"
              name="day"
              value={slot.day}
              onChange={(e) => handleInputChange(index, "timeSlot", e)}
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="time"
              label="Starting Time"
              name="startTime"
              value={slot.startTime}
              onChange={(e) => handleInputChange(index, "timeSlot", e)}
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="time"
              label="Ending Time"
              name="endTime"
              value={slot.endTime}
              onChange={(e) => handleInputChange(index, "timeSlot", e)}
            />
          </CCol>
          <CCol xs={12}>
            <CButton color="danger" onClick={() => handleDeleteTimeSlot(index)}>
              Delete
            </CButton>
          </CCol>
        </React.Fragment>
      ))}

      <CCol xs={12}>
        <CButton color="primary" onClick={handleAddTimeSlot}>
          Add Time Slot
        </CButton>
      </CCol>
      <CCol xs={12}>
        <CFormTextarea
          id="aboutDoctor"
          label="About"
          placeholder="Write about you..."
          style={{ borderRadius: "8px" }}
        />
      </CCol>
      <CCol xs={12} className="d-flex align-items-center">
        <div className="avatar-container">
          <img
            src="https://t4.ftcdn.net/jpg/02/60/04/09/240_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg"
            alt="Doctor"
            className="avatar-image"
          />
        </div>

        <CInputGroup className="ml-3">
          <CFormInput
            type="file"
            id="profilePicture"
            accept="image/*"
            style={{ borderRadius: "8px" }}
          />
        </CInputGroup>
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  );
};

export default ProfileForm;
