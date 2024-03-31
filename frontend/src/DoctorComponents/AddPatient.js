import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const AddPatient = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    const response = await axios.post('https://ishapaghdal-DiagnoCare.hf.space/auth/patients', formData, config);

    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Patient added successfully',
      });
    }

    setFormData({
      name: "",
      patient_email:"",
      address: "",
      phone_number: "",
    });
    props.handleClose();
  };

  return (
    <div className="d-form-container">
      <div className="d-form-text-section">
        <div className="col-xxl-12 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-5">
            <h3 className="fs-10 mb-4">
              Add Patient Details
            </h3>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="name">
                    Name <span>*</span>
                  </label>
                  <input
                    id="name"
                    placeholder="Enter name of the patient"
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Name is required</div>
                </div>
              </div>
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="patient_email">
                    Email <span>*</span>
                  </label>
                  <input
                    id="patient_email"
                    placeholder="Enter Email of the patient"
                    type="email"
                    className="form-control"
                    name="patient_email"
                    value={formData.patient_email}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Email is required</div>
                </div>
              </div>

              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="address">
                    Address <span>*</span>
                  </label>
                  <input
                    id="address"
                    placeholder="Enter address of the patient"
                    type="text"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Address is required</div>
                </div>
              </div>

              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="phone_number">
                    Phone Number <span>*</span>
                  </label>
                  <input
                    id="phone_number"
                    placeholder="Enter phone number of the patient"
                    type="text"
                    className="form-control"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Phone number is required</div>
                </div>
              </div>

              <div className="align-items-center">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
