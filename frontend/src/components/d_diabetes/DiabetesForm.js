import React, { useState, useEffect } from "react";
import "./form.css";
import api from "../../api.js";
import loader from "../../assets/Spinner-2.gif";
import { jsPDF } from "jspdf";
// import "jspdf-autotable";

const ACCESS_TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcwOTc0NTg0MSwianRpIjoiOTFiYzkxY2MtNDI4MC00NzI3LWI2NjQtN2U4ZmM2ZWI1ZDUyIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImFiYyIsIm5iZiI6MTcwOTc0NTg0MSwiZXhwIjoxNzA5ODMyMjQxLCJpc19zdGFmZiI6dHJ1ZX0.9_kGfP5Gs3VXYhZvRzJ6utUD2IqngIp1qJq_7IrGv3U"
const DiabetesForm = () => {
  const [Symptoms, setSymptoms] = useState();
  const [predicted_category, setpredicted_category] = useState();
  const [Treatment, setTreatment] = useState();
  const [Recommendation, setRecommendation] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    Patient_Name: "",
    Patient_address: "",
    Patient_mobile: "",
    Patient_email: "",
    Doctor_Name: "",
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
    try{
      setLoading(true);

    console.log("Form Data:", formData);
    const a = await api.post(
      "http://localhost:5000/predict/diabetes",
      formData
    );
    console.log("got prediction");
      setSymptoms(a.data.Symptoms);
      setpredicted_category(a.data.predicted_category);
      setTreatment(a.data.Treatment);
      setRecommendation(a.data.Recommendation);
    }catch (error) {
      console.error("Error analyzing disease:", error);
    } finally {
      setLoading(false);
    }
 
  };

  // const handleDownloadPDF = async () => {
  //   const doc = new jsPDF();

  //   const maxWidth = 300;
  //   doc.setFont("helvetica", "bold");
  //   doc.setFontSize(20);

  //   const predicted_categoryLines = doc.splitTextToSize(
  //     predicted_category,
  //     maxWidth
  //   );
  //   const SymptomsLines = doc.splitTextToSize(Symptoms, maxWidth);
  //   const TreatmentLines = doc.splitTextToSize(Treatment, maxWidth);
  //   const RecommendationLines = doc.splitTextToSize(Recommendation, maxWidth);

  //   doc.setFont("helvetica");
  //   doc.setFontSize(20);

  //   let yPos = 30;
  //   doc.text("REPORT", 87, yPos);
  //   doc.setFontSize(12);

  //   yPos += 12;
  //   doc.setTextColor(255, 0, 0);
  //   doc.text("Disease name:", 10, yPos);
  //   yPos += 7;
  //   doc.setTextColor(0, 0, 0);
  //   doc.text("Diabetes", 10, yPos);
  //   yPos += 12;

  //   doc.setTextColor(255, 0, 0);
  //   doc.text("Predicted Category of Disease:", 10, yPos);
  //   yPos += 7;
  //   doc.setTextColor(0, 0, 0);
  //   doc.text(predicted_categoryLines, 10, yPos);
  //   yPos += predicted_categoryLines.length * 12;

  //   doc.setTextColor(255, 0, 0);
  //   doc.text("Symptoms:", 10, yPos);
  //   yPos += 7;
  //   doc.setTextColor(0, 0, 0);
  //   doc.text(SymptomsLines, 10, yPos);
  //   yPos += SymptomsLines.length * 12;

  //   doc.setTextColor(255, 0, 0);
  //   doc.text("Treatment:", 10, yPos);
  //   yPos += 7;
  //   doc.setTextColor(0, 0, 0);
  //   doc.text(TreatmentLines, 10, yPos);
  //   yPos += TreatmentLines.length * 10;

  //   doc.setTextColor(255, 0, 0);
  //   doc.text("Recommendation:", 10, yPos);
  //   yPos += 7;
  //   doc.setTextColor(0, 0, 0);
  //   doc.text(RecommendationLines, 10, yPos);

  //   doc.save("DiabetesReport.pdf");
  // };

  const handleDownloadPDF = async () => {
    // Create a new jsPDF document
    const doc = new jsPDF();

    // Define data for the table
    const tableData = [
        { header: "Field", content: "Value" }, // Table header
        { header: "Disease name:", content: "Diabetes" }, // Disease name row
        { header: "Predicted Category of Disease:", content: predicted_category }, // Predicted Category row
        { header: "Symptoms:", content: Symptoms }, // Symptoms row
        { header: "Treatment:", content: Treatment }, // Treatment row
        { header: "Recommendation:", content: Recommendation } // Recommendation row
    ];

    // Set font style and size for title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    // Add title
    doc.text("REPORT", 87, 30);

    // Set font style and size for content
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Set initial y position for table
    let yPos = 45;

    // Add table using autoTable plugin
    doc.autoTable({
        startY: yPos,
        head: [[{ content: 'Field', styles: { textColor: [255, 0, 0] } }, { content: 'Value', styles: { textColor: [0, 0, 0] } }]], // Table header with custom styles
        body: tableData.slice(1).map(row => [row.header, row.content]), // Table body with data
        theme: 'grid', // Table theme
        styles: { halign: 'left', valign: 'middle' }, // Table styles
        columnStyles: { 0: { fontStyle: 'bold' } }, // Column styles
        margin: { left: 10, right: 10 } // Table margin
    });

    // Save the PDF with filename "DiabetesReport.pdf"
    doc.save("DiabetesReport.pdf");
};



  return (
    <>
      <div>
      </div>
      <div className="d-form-container">
        <div className="d-form-text-section">
          <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
            <div className="card-body p-5">
              <h1 className="fs-10 mb-5 align-items-center">
                Diabetes 
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
                      requir
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
              Recommendation &&
               (
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
      </div>
    </>
  );
};

export default DiabetesForm;
