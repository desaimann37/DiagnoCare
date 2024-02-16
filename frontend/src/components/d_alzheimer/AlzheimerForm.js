import React, { useState } from "react";
import "../d_braintumor/btform.css";
import "./toast.css"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";

const AlzheimerForm = () => {
  const [formData, setFormData] = useState({
    AlzheimerImage: null,
  });
  const [prediction, setPrediction] = useState();

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.AlzheimerImage) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.AlzheimerImage);

      const response = await axios.post(
        "http://localhost:5000/predict_alzheimer",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error analyzing soil:", error);
    }
  };

  return (
    <div className="d-form-container">
      {/* <ToastContainer
        className="Toastify__toast-container"
        toastClassName="Toastify__toast"
        bodyClassName="Toastify__toast-body"
      /> */}
      <div className="d-form-text-section">
        <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
          <div className="card-body p-5">
            <h1 className="fs-10 card-title fw-bold mb-5">
              Alzheimer's Detection
            </h1>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label className="mb-2 label-large" htmlFor="AlzheimerImage">
                  Upload MRI Photo <span>*</span>
                </label>
                <input
                  id="AlzheimerImage"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  name="AlzheimerImage"
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">Image is required</div>
              </div>

              <div className="align-items-center">
                <button type="submit" className="btn btn-primary">
                  Detect Disease
                </button>
              </div>
            </form>
            {prediction && (
              <div className="prediction-result">
                <h2>Disease :</h2>
                <h5>{prediction}</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="steps-container"></div>
    </div>
  );
};

export default AlzheimerForm;
