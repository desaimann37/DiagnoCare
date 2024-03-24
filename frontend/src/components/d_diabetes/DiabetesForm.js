import React, { useState, useEffect } from "react";
import axios from "axios";
import loader from "../../assets/Spinner-2.gif";
import { jsPDF } from "jspdf";
import { Container, Typography, Grid, Checkbox } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddPatient from "../AddPatient";
import ViewPdfButton from "../ViewPdfButton";
import Swal from "sweetalert2";
import api from "../../api.js";
import "./form.css";
import "jspdf-autotable";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const DiabetesForm = () => {
  const [Symptoms, setSymptoms] = useState();
  const [predicted_category, setpredicted_category] = useState();
  const [Treatment, setTreatment] = useState();
  const [Recommendation, setRecommendation] = useState();
  const [loading, setLoading] = useState(false);
  const [combinedData, setCombinedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
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

  useEffect(() => {
    console.log(selectedPatient);
    if (selectedPatient) {
      let combined_data = {
        symptom: Symptoms,
        predicted_category: predicted_category,
        Treatment: Treatment,
        Recommendation: Recommendation,
        patient_details: {
          name: selectedPatient.name,
          address: selectedPatient.address,
          phone: selectedPatient.phone,
        },
      };
      setCombinedData(combined_data);
      console.log(combined_data); //This object contains all data required to generate report
    }
  }, [
    selectedPatient,
    Symptoms,
    predicted_category,
    Treatment,
    Recommendation,
  ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/auth/patients",
          config
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };
    fetchPatients();
  }, []);



  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    window.location = "/diabetes";
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatient) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a patient.",
      });
      return;
    }

    if (!formData.Age || !formData.BMI || !formData.CholCheck || !formData.HeartDiseaseorAttack || !formData.HighBP || !formData.HighChol || !formData.Sex || !formData.Stroke) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please Fill Up All The Fields.",
      });
      return;
    }
    
    try {
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
    } catch (error) {
      console.error("Error analyzing disease:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadPDF = async(pdfData) => {
    const formData = new FormData();
    
    const filename = `${combinedData.patient_details.name}_DiabetesReport.pdf`;
  
    formData.append("pdf", pdfData, filename);
  
    try {
       const response =  await axios.post(
        "http://localhost:5000/store/report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Successful",
        text: "PDF downloaded and stored successfully!",
        showConfirmButton: true,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error uploading PDF",
        text: "An error occurred while uploading the PDF.",
      });
    }
  } catch (error) {
    console.error("Error uploading PDF:", error);
    Swal.fire({
      icon: "error",
      title: "Error uploading PDF",
      text: "An error occurred while uploading the PDF.",
    });
  }
  };
  

  const handleDownloadPDF = async () => {
    if (!combinedData) {
      console.error("Combined data is not available.");
      return;
    }

    const { name, phone, address } = combinedData.patient_details;
    // Define data for the table
    const tableData = [
      { header: "Doctor Name:", content: JSON.parse(localStorage.getItem('loggedin_obj')).user.name }, 
      { header: "Doctor EmailId:", content: JSON.parse(localStorage.getItem('loggedin_obj')).user.email }, 
      { header: "Patient Name:", content: name }, 
      { header: "Phone:", content: phone },
      { header: "Address:", content: address },
      { header: "HighBP:", content: formData.HighBP }, 
      { header: "HighChol:", content: formData.HighChol }, 
      { header: "CholCheck:", content: formData.CholCheck }, 
      { header: "BMI:", content: formData.BMI }, 
      { header: "Stroke:", content: formData.Stroke }, 
      {
        header: "Heart Disease or Attack:",
        content: formData.HeartDiseaseorAttack,
      }, 
      { header: "Sex:", content: formData.Sex }, 
      { header: "Age:", content: formData.Age }, 
      { header: "Disease name:", content: "Diabetes" },
      { header: "Predicted Category of Disease:", content: predicted_category }, 
      { header: "Symptoms:", content: Symptoms },
      { header: "Treatment:", content: Treatment }, 
      { header: "Recommendation:", content: Recommendation }, 
    ];

    // Create a new jsPDF document
    const doc = new jsPDF();

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
      head: [
        [
          { content: "Field", styles: { textColor: [255, 0, 0] } },
          { content: "Value", styles: { textColor: [0, 0, 0] } },
        ],
      ], // Table header with custom styles
      body: tableData.map((row) => [row.header, row.content]), // Table body with data
      theme: "grid", // Table theme
      styles: { halign: "left", valign: "middle" }, // Table styles
      columnStyles: { 0: { fontStyle: "bold" } }, // Column styles
      margin: { left: 10, right: 10 }, // Table margin
    });

    // Save the PDF "
    const pdfData = doc.output("blob");
    handleUploadPDF(pdfData);
    doc.save(combinedData.patient_details.name + "_DiabetesReport.pdf");
  };

  const handleRowSelect = async (index, id) => {
    if (selectedRow === index) {
      setSelectedRow(null); // Deselect if already selected
    } else {
      setSelectedRow(index); // Select the clicked row
      console.log("Row selected:", index);
      id = id["$oid"];
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };
        const response = await axios.get(
          `http://127.0.0.1:5000/auth/patient/${id}`,
          config
        );
        console.log(response);
        setSelectedPatient({
          patient_id: response.data._id.$oid,
          name: response.data.name,
          address: response.data.address,
          phone: response.data.phone_number,
        });
        console.log(selectedPatient);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    }
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Patient
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <AddPatient handleClose={handleClose} />
        </DialogContent>
      </BootstrapDialog>


      <div className="d-form-text-section">
        <h1 className="fs-10 mb-5 align-items-center">Diabetes</h1>
      </div>

   
      <Container style={{ marginTop: "100px", maxWidth: "1400px" }}>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
              <h1 className="patient-list">Patients List</h1>
            </Typography>
          </Grid>
          <Grid item>
            <button onClick={handleClickOpen} className="btn btn-primary">
              Add Patient
            </button>
          </Grid>
        </Grid>
      <div style={{ maxHeight: "260px", overflowY: "auto", marginTop: "20px" }}>
        <div className="align-center">
          <div className="diabetes-row">
            {patients.map((patient, index) => (
              <div key={patient._id} className="diabetes-column">
                <div className="diabetes-icon-container">
                  <Checkbox
                    checked={selectedRow === index}
                    onChange={() => handleRowSelect(index, patient._id)}
                  />
                </div>
                <div className="diabetes-content">
                  <h1>Name : {patient.name}</h1>
                  <p>
                    Address : {patient.address}
                    <br />
                    Phone No. : {patient.phone_number}
                  </p>
                </div>

                <ViewPdfButton
                  pdfName={patient._id.$oid}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
        <br />

        {/* Displayng Selected Patient...*/}
        {selectedPatient && (
          <div
            className=""
            style={{
              backgroundColor: "#d9f0fe",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              key={selectedPatient._id}
              className=""
              style={{
                padding: "15px",
                width: "300px",
              }}
            >
              <h2>Selected Patient</h2>
              <div className="diabetes-content">
                <h1>Name : {selectedPatient.name}</h1>
                <p>
                  Address : {selectedPatient.address}
                  <br />
                  Phone No. : {selectedPatient.phone}
                </p>
              </div>

              <ViewPdfButton
                pdfName={selectedPatient.patient_id}
              />
            </div>
          </div>
        )}
      </Container>

      {/* Form to upload Image...*/}
      <div className="d-form-container">
        <div className="d-form-text-section">
          <div className="col-xxl-8 col-xl-9 col-lg-9 col-md-7 col-sm-9">
            <div className="card-body p-5">
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
              <br />
              {loading && (
                <div className="loader-container">
                  <img src={loader} alt="Loader" className="loader" />
                  <br />
                  <div className="loader-container">Genrating Report...</div>
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
                    <br />
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
