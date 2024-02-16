import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import "./btform.css";

const BrainTumorForm = () => {
  const [formData, setFormData] = useState({
    BrainTumorImage: null,
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.BrainTumorImage) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("file", formData.BrainTumorImage);

      const response = await axios.post(
        "http://localhost:5000/predict_braintumor",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.data;
      console.log(data);
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
              BrainTumor Detection
            </h1>
            <form
              method="POST"
              className="needs-validation"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label className="mb-2 label-large" htmlFor="BrainTumorImage">
                  Upload MRI Photo <span>*</span>
                </label>
                <input
                  id="BrainTumorImage"
                  type="file"
                  accept="image/*"
                  className="form-control"
                  name="BrainTumorImage"
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

export default BrainTumorForm;
