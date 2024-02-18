import React, { useState } from "react";
import "./form.css";
import api from '../../api.js'




const DiabetesForm = () => {
  const [formData, setFormData] = useState({
    HighBP: "",
    HighChol: "",
    CholCheck: "",
    BMI: "",
    Stroke: "",
    HeartDiseaseorAttack: "",
    Sex: "",
    Age: "",
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
    const a = await api.post('/predict/diabetes/', formData);
    console.log("got prediction")
    console.log(a.data)
  };

  // const handleGenerateReport = () => {
  //   setShowReport(true);
  // };

 

  return (

    <div className="d-form-container">
      <div className="d-form-text-section">
        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-5">
            <h1 className="fs-10 card-title fw-bold mb-4">
              Diabetes Prediction
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
                  <label className="mb-2 label-large" htmlFor="Sex">
                    Gender <span>*</span>
                  </label>
                  <select
                    id="Sex"
                    className="form-control custom-dropdown"
                    name="Sex"
                    value={formData.Sex}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                  <div className="invalid-feedback">Gender is required</div>
                </div>
                </div>

              {/* Row 2 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="HighBP">
                    High BP <span>*</span>
                  </label>
                  <select
                    id="HighBP"
                    className="form-control custom-dropdown"
                    name="HighBP"
                    value={formData.HighBP}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <div className="invalid-feedback">High BP is required</div>
                </div>

                <div className="flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="HighChol">
                    High Cholesterol <span>*</span>
                  </label>
                  <select
                    id="HighChol"
                    className="form-control custom-dropdown"
                    name="HighChol"
                    value={formData.HighChol}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <div className="invalid-feedback">
                    High Cholesterol is required
                  </div>
                </div>
              </div>

              {/* Row 3 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                <label className="mb-2 label-large" htmlFor="Stroke">
                    Stroke <span>*</span>
                  </label>
                  <select
                    id="Stroke"
                    className="form-control custom-dropdown"
                    name="Stroke"
                    value={formData.Stroke}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <div className="invalid-feedback">Stroke is required</div>
                </div>

                <div className="flex-grow-1">
                <label className="mb-2 label-large" htmlFor="CholCheck">
                    Cholesterol Check<span>*</span>
                  </label>
                  <select
                    id="CholCheck"
                    className="form-control custom-dropdown"
                    name="CholCheck"
                    value={formData.CholCheck}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <div className="invalid-feedback">
                    Cholesterol Check is required
                  </div>
                </div>
              </div>

              {/* Row 4 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="BMI">
                    BMI <span>*</span>
                  </label>
                  <input
                    id="BMI"
                    placeholder="Enter BMI value"
                    type="text"
                    className="form-control"
                    name="BMI"
                    value={formData.BMI}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">BMI is required</div>
                </div>

                <div className="flex-grow-1">
                  <label className="mb-2 label-large" htmlFor="Age">
                    Age <span>*</span>
                  </label>
                  <input
                    id="Age"
                    placeholder="Enter Age"
                    type="number"
                    className="form-control"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">Age is required</div>
                </div>
              </div>

              {/* Row 5 */}
              <div className="mb-3 d-flex">
                <div className="mr-3 flex-grow-1">
                  <label
                    className="mb-2 label-large"
                    htmlFor="HeartDiseaseorAttack"
                  >
                    Heart Disease or Attack <span>*</span>
                  </label>
                  <select
                    id="HeartDiseaseorAttack"
                    className="form-control custom-dropdown"
                    name="HeartDiseaseorAttack"
                    value={formData.HeartDiseaseorAttack}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <div className="invalid-feedback">Select an option</div>
                </div>

              </div>

              <div className="align-items-center">
                <button type="submit" className="btn btn-primary">
                  Predict
                </button>

              </div>


            </form>
       
          </div>
        </div>
      </div>
    </div>
  );
            };

export default DiabetesForm;
