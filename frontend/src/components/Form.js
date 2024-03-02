import React, { useState } from "react";
import api from "../api.js";

const Form = () => {
  const [formData, setFormData] = useState({
    Name: "",
    PatientId: "",
    Address: "",
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
    console.log("Form Data:", formData);
  };

  return (
    <div className="d-form-container">
      <div className="d-form-text-section">
        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-5">
            <h1 className="fs-10 card-title fw-bold mb-4">
              Add Patient Details
            </h1>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="patientId">
                    Pateint Id <span>*</span>
                  </label>
                  <input
                    id="PatientId"
                    placeholder="Enter patient id"
                    type="text"
                    className="form-control"
                    name="Patient Id"
                    value={formData.PatientId}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Patient Id is required</div>
                </div>
              </div>

              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="Name">
                    Name <span>*</span>
                  </label>
                  <input
                    id="Name"
                    placeholder="Enter name of the patinet"
                    type="text"
                    className="form-control"
                    name="Name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Name is required</div>
                </div>
              </div>

              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="Address">
                    Address <span>*</span>
                  </label>
                  <input
                    id="Address"
                    placeholder="Enter Address of the patinet"
                    type="text"
                    className="form-control"
                    name="Address"
                    value={formData.Address}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Address is required</div>
                </div>
              </div>

              <div className="align-items-center">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
