import React, { useState } from "react";
import "../d_braintumor/btform.css";
import "./toast.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import loader from "../../assets/Spinner-2.gif";
import { jsPDF } from "jspdf";


const AlzheimerForm = () => {
  const [formData, setFormData] = useState({
    AlzheimerImage: null,
  });
  const [Symptoms, setSymptoms] = useState();
  const [predicted_category, setpredicted_category] = useState();
  const [Treatment, setTreatment] = useState();
  const [Recommendation, setRecommendation] = useState();
  const [loading, setLoading] = useState(false);

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
      setLoading(true);

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

      setSymptoms(data.Symptoms);
      setpredicted_category(data.predicted_category);
      setTreatment(data.Treatment);
      setRecommendation(data.Recommendation);
    } catch (error) {
      console.error("Error analyzing disease:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    const doc = new jsPDF();

    const maxWidth = 300;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    const predicted_categoryLines = doc.splitTextToSize(
      predicted_category,
      maxWidth
    );
    const SymptomsLines = doc.splitTextToSize(Symptoms, maxWidth);
    const TreatmentLines = doc.splitTextToSize(Treatment, maxWidth);
    const RecommendationLines = doc.splitTextToSize(Recommendation, maxWidth);

    doc.setFont("helvetica");
    doc.setFontSize(20);

    let yPos = 30;
    doc.text("REPORT", 87, yPos);

    // Convert the image to base64 data URL
    const imageBase64 = await getImageBase64(formData.AlzheimerImage);

    // Add image to PDF
    doc.addImage(imageBase64, "JPG", 10, 40, 60, 60);

    doc.setFontSize(12);

    yPos += 80;
    doc.setTextColor(255, 0, 0);
    doc.text("Disease name:", 10, yPos);
    yPos += 7;
    doc.setTextColor(0, 0, 0);
    doc.text("Alzheimer", 10, yPos);
    yPos += 12;

    doc.setTextColor(255, 0, 0);
    doc.text("Predicted Category of Disease:", 10, yPos);
    yPos += 7;
    doc.setTextColor(0, 0, 0);
    doc.text(predicted_categoryLines, 10, yPos);
    yPos += predicted_categoryLines.length * 12;

    doc.setTextColor(255, 0, 0);
    doc.text("Symptoms:", 10, yPos);
    yPos += 7;
    doc.setTextColor(0, 0, 0);
    doc.text(SymptomsLines, 10, yPos);
    yPos += SymptomsLines.length * 12;

    doc.setTextColor(255, 0, 0);
    doc.text("Treatment:", 10, yPos);
    yPos += 7;
    doc.setTextColor(0, 0, 0);
    doc.text(TreatmentLines, 10, yPos);
    yPos += TreatmentLines.length * 10;

    doc.setTextColor(255, 0, 0);
    doc.text("Recommendation:", 10, yPos);
    yPos += 7;
    doc.setTextColor(0, 0, 0);
    doc.text(RecommendationLines, 10, yPos);

    doc.save("AlzheimerReport.pdf");
  };

  const getImageBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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
            <br />
            {loading && (
              <div className="loader-container">
                <img src={loader} alt="Loader" className="loader" />
              </div>
            )}
            {!loading &&
              Symptoms &&
              predicted_category &&
              Treatment &&
              Recommendation && (
                <>
                  <h1>Report</h1>
                  <br />

                  <div className="prediction-result">
                    <h2>Predicted Category :</h2>
                    <h5>{predicted_category}</h5>
                  </div>
                  <br />

                  <div className="prediction-result">
                    <h2>Symptoms :</h2>
                    <h5>{Symptoms}</h5>
                  </div>
                  <br />

                  <div className="prediction-result">
                    <h2>Treatment :</h2>
                    <h5>{Treatment}</h5>
                  </div>
                  <br />

                  <div className="prediction-result">
                    <h2>Recommendation :</h2>
                    <h5>{Recommendation}</h5>
                  </div>
                  <br />

                  <div className="align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleDownloadPDF}
                    >
                      Download Report PDF
                    </button>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
      <div className="steps-container"></div>
    </div>
  );
};

export default AlzheimerForm;
