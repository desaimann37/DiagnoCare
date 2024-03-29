import React, { useState, useEffect } from "react";
import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  CInputGroup,
  CFormTextarea,
  CFormSelect,
} from "@coreui/react";
import Swal from 'sweetalert2';
import "./profile.css";
import axios from "axios";
import LoadingPage from "../../PatientComponents/LoadingPage";

const ProfileForm = () => {
  const [Profilepic, setProfilepic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    specialization: "",
    price: "",
    qualifications: [],
    experiences: [],
    timeslots: [],
    about: "",
    photo: null
  });

  useEffect(() => {
    
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
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

        setProfilepic(response.data.photo);
        const userData = response.data;
        
        const updatedQualifications = userData.qualifications.map(qualification => ({
          ...qualification,
          startDate: new Date(qualification.startDate.$date).toISOString().split('T')[0],
          endDate: new Date(qualification.endDate.$date).toISOString().split('T')[0]
        }));

        console.log(userData.experiences[0].startDate.$date);
        const updatedExperiences = userData.experiences.map(experience => ({
          ...experience,
          startDate: new Date(experience.startDate.$date).toISOString().split('T')[0],
          endDate: new Date(experience.endDate.$date).toISOString().split('T')[0]
        }));

        const updatedTimeslots = userData.timeslots.map(slot => ({
          ...slot,
          date: new Date(slot.date.$date).toISOString().split('T')[0]
        }));

        console.log(userData.photo);

        setFormData(prevFormData => ({
          ...prevFormData,
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          bio: userData.bio || "",
          specialization: userData.specialization || "",
          price: userData.price || "",
          qualifications: updatedQualifications || [],
          experiences: updatedExperiences || [],
          timeslots: updatedTimeslots || [],
          about: userData.about || "",
          photo: userData.photo ? new File([], userData.photo.name) : null
        }));
        setLoading(false);
      } catch (error) {
        console.error('Error occurred while fetching profile data:', error);
      }

     
    };

    fetchProfileData();
  }, []);
  console.log("form data :")
  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddQualification = () => {
    setFormData({
      ...formData,
      qualifications: [
        ...formData.qualifications,
        { startDate: "", endDate: "", degree: "", university: "" },
      ],
    });
  };

  const handleDeleteQualification = (index) => {
    const newQualifications = [...formData.qualifications];
    newQualifications.splice(index, 1);
    setFormData({
      ...formData,
      qualifications: newQualifications,
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { startDate: "", endDate: "", position: "", location: "" },
      ],
    });
  };

  const handleDeleteExperience = (index) => {
    const newExperiences = [...formData.experiences];
    newExperiences.splice(index, 1);
    setFormData({
      ...formData,
      experiences: newExperiences,
    });
  };

  const handleAddTimeSlot = () => {
    setFormData({
      ...formData,
      timeslots: [...formData.timeslots, { date: "", startTime: "", endTime: "" }],
    });
  };

  const handleDeleteTimeSlot = (index) => {
    const newtimeslots = [...formData.timeslots];
    newtimeslots.splice(index, 1);
    setFormData({
      ...formData,
      timeslots: newtimeslots,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.about || !formData.bio || !formData.email || !formData.experiences || !formData.name || !formData.phone || !formData.photo || !formData.price || !formData.qualifications || !formData.specialization || !formData.timeslots) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Up All The Fields.",
      });
      return;
    }

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data' // Change content type to multipart/form-data
      }
    };
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('bio', formData.bio);
    formDataToSend.append('specialization', formData.specialization);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('about', formData.about);
    formDataToSend.append('photo', formData.photo); // Append photo to formDataToSend
  

    formData.qualifications.forEach((qualification, index) => {
      {
      formDataToSend.append(`qualifications[startDate]`, qualification.startDate);
      formDataToSend.append(`qualifications[endDate]`, qualification.endDate);
      formDataToSend.append(`qualifications[degree]`, qualification.degree);
      formDataToSend.append(`qualifications[university]`, qualification.university);
      }
    });
  

    formData.experiences.forEach((experience, index) => {
      {
      formDataToSend.append(`experiences[startDate]`, experience.startDate);
      formDataToSend.append(`experiences[endDate]`, experience.endDate);
      formDataToSend.append(`experiences[position]`, experience.position);
      formDataToSend.append(`experiences[location]`, experience.location);
      }
    });
  

    formData.timeslots.forEach((slot, index) => {
      formDataToSend.append(`timeslots[date]`, slot.date);
      formDataToSend.append(`timeslots[startTime]`, slot.startTime);
      formDataToSend.append(`timeslots[endTime]`, slot.endTime);
    });
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/doctor/add', formDataToSend, config);
  
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "doctor's profile updated successfully",
        });
      }
  
    //  Reset form data after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        bio: "",
        specialization: "",
        price: "",
        qualifications: [],
        experiences: [],
        timeslots: [],
        about: "",
        photo: null
      });
    } catch (error) {
      console.error('Error occurred while submitting form:', error);
    }
  };
  

  const handleInputChange = (type, index, e) => {
    const { name, value } = e.target;
    if (type === "qualifications") {
      const newQualifications = [...formData.qualifications];
      newQualifications[index][name.split("-")[0]] = value;
      setFormData({
        ...formData,
        qualifications: newQualifications,
      });
    } else if (type === "experiences") {
      const newExperiences = [...formData.experiences];
      newExperiences[index][name.split("-")[0]] = value;
      setFormData({
        ...formData,
        experiences: newExperiences,
      });
    } else if (type === "timeslots") {
      const newtimeslots = [...formData.timeslots];
      newtimeslots[index][name.split("-")[0]] = value;
      setFormData({
        ...formData,
        timeslots: newtimeslots,
      });
    }
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
    <CForm className="row g-3" onSubmit={handleSubmit}>
      <CCol md={6}>
        <CFormInput
          type="text"
          id="inputName"
          name="name"
          onChange={handleChange}
          value={formData.name}
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
          name="email"
          value={formData.email}
          onChange={handleChange}
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
          onChange={handleChange}
          name="phone"
          value={formData.phone}
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
          onChange={handleChange}
          name="bio"
          value={formData.bio}
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
          id="inputSpecialization"
          label="Specialization"
          onChange={handleChange}
          name="specialization"
          value={formData.specialization}
        >
          <option value="">Choose...</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Diabetologists">Diabetologists</option>
          <option value="pulmonologist">pulmonologist</option>
        </CFormSelect>
      </CCol>
      <CCol xs={4}>
        <CFormInput
          id="inputPrice"
          name="price"
          onChange={handleChange}
          value={formData.price}
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

      {formData.qualifications.map((qualification, index) => (
        <React.Fragment key={index}>
          <CCol md={6}>
            <CFormInput
              label="Start Date"
              type="date"
              name={`startDate-${index}`}
              value={qualification.startDate}
              onChange={(e) => handleInputChange("qualifications", index, e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="End Date"
              type="date"
              name={`endDate-${index}`}
              value={qualification.endDate}
              onChange={(e) => handleInputChange("qualifications", index, e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              label="Degree"
              name={`degree-${index}`}
              value={qualification.degree}
              placeholder="Degree"
              onChange={(e) => handleInputChange("qualifications", index, e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="University"
              type="text"
              name={`university-${index}`}
              value={qualification.university}
              placeholder="University"
              onChange={(e) => handleInputChange("qualifications", index, e)}
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
      {formData.experiences.map((experience, index) => (
        <React.Fragment key={index}>
          <CCol md={6}>
            <CFormInput
              label="Start Date"
              type="date"
              name={`startDate-${index}`}
              value={experience.startDate}
              onChange={(e) => handleInputChange("experiences", index, e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="End Date"
              type="date"
              name={`endDate-${index}`}
              value={experience.endDate}
              onChange={(e) => handleInputChange("experiences", index, e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="text"
              label="Position"
              name={`position-${index}`}
              value={experience.position}
              placeholder="Position"
              onChange={(e) => handleInputChange("experiences", index, e)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="Location"
              type="text"
              name={`location-${index}`}
              value={experience.location}
              placeholder="Location"
              onChange={(e) => handleInputChange("experiences", index, e)}
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
      {formData.timeslots.map((slot, index) => (
        <React.Fragment key={index}>
          <CCol md={4}>
            <CFormInput
              label="Date"
              type="date"
              name={`date-${index}`}
              value={slot.date}
              onChange={(e) => handleInputChange("timeslots", index, e)}
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="time"
              label="Starting Time"
              name={`startTime-${index}`}
              value={slot.startTime}
              onChange={(e) => handleInputChange("timeslots", index, e)}
            />
          </CCol>
          <CCol md={4}>
            <CFormInput
              type="time"
              label="Ending Time"
              name={`endTime-${index}`}
              value={slot.endTime}
              onChange={(e) => handleInputChange("timeslots", index, e)}
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
          id="about"
          label="About"
          name="about"
          onChange={handleChange}
          value={formData.about}
          placeholder="Write about you..."
          style={{ borderRadius: "8px" }}
        />
      </CCol>
      <CCol xs={12} className="d-flex align-items-center">
        <div className="avatar-container">
          <img

           src={Profilepic?`data:image/jpeg;base64,${Profilepic.$binary.base64}`:"https://www.iconbunny.com/icons/media/catalog/product/2/1/2131.12-doctor-icon-iconbunny.jpg"}
           alt="Doctor"
            className="avatar-image"
          />
        </div>

        <CInputGroup className="ml-3">
          <CFormInput
            type="file"
            name="photo"
            id="profilePicture"
            accept="image/*"
            style={{ borderRadius: "8px" }}
            onChange={(e) => {
             
              const file = e.target.files[0];
              setFormData((prevFormData) => ({
                ...prevFormData,
                photo: file // Update the 'photo' field with the selected file
              }));
            }}
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


