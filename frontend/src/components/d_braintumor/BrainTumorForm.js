import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import loader from "../../assets/Spinner-2.gif";
import { Container, Typography, Grid, Checkbox } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import AddPatient from "../AddPatient";
import UploadForm from "../UploadForm";
import ViewPdfButton from "../ViewPdfButton";
import Swal from "sweetalert2";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BrainTumorForm = () => {
  const [formData, setFormData] = useState({
    BrainTumorImage: null,
  });
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

  const handlePdfUpload = (pdfData) => {
    console.log("PDF Data:", pdfData);
  };

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
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please upload an image.",
      });
      return;
    }

    if (!selectedPatient) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select a patient.",
      });
      return;
    }

    try {
      setLoading(true);

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

  const handleUploadPDf = async (pdfname) => {
    const formData = new FormData();
    formData.append("pdf", pdfname);
    formData.append("selectedPatient", JSON.stringify(selectedPatient));

    try {
      const response = await axios.post(
        "http://localhost:5000/store/report",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure correct content type
          },
        }
      );
      console.log("PDF uploaded successfully...");
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  const handleDownloadPDF = async () => {
    if (!combinedData) {
      console.error("Combined data is not available.");
      return;
    }

    const doc = new jsPDF();

    const { name, phone, address } = combinedData.patient_details;
    const imageBase64 = await getImageBase64(formData.BrainTumorImage);

    const tableData = [
      { header: "Doctor Name:", content: JSON.parse(localStorage.getItem('loggedin_obj')).user.name }, 
      { header: "Doctor EmailId:", content: JSON.parse(localStorage.getItem('loggedin_obj')).user.email }, 
      { header: "Patient Name:", content: name }, 
      { header: "Phone:", content: phone },
      { header: "Address:", content: address },
      { header: "Disease name:", content: "BrainTumour" },
      { header: "Predicted Category of Disease:", content: predicted_category }, 
      { header: "Symptoms:", content: Symptoms },
      { header: "Treatment:", content: Treatment }, 
      { header: "Recommendation:", content: Recommendation }, 
    ];

    // Set font style and size for title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    // Add title
    doc.text("REPORT", 87, 30);

    doc.addImage(imageBase64, "JPG", 10, 40, 60, 60);

    // Set font style and size for content
    doc.setFont("helvetica");
    doc.setFontSize(12);

    // Set initial y position for table
    let yPos = 105;

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
    doc.save(combinedData.patient_details.name + "_BrainTumour.pdf");

    handleUploadPDf(combinedData.patient_details.name + "_BrainTumour.pdf");
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
    <>
      {/* Add Patient Dialog Box...*/}
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

      {/* Totle...*/}
      <div className="d-form-text-section">
        <h1 className="fs-10 mb-5 align-items-center">BrainTumor</h1>
      </div>

      {/* Displaying List of Patients...*/}
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
                  // pdfName={patient.name + "_AlzheimerReport.pdf"}
                  pdfName={patient._id.$oid}
                />
              </div>
            ))}
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
                // pdfName={patient.name + "_AlzheimerReport.pdf"}
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
              <br />
              <br />
              {loading && (
                <>
                  <div className="loader-container">
                    <img src={loader} alt="Loader" className="loader" />
                  </div>
                  <br />
                  <div className="loader-container">Genrating Report...</div>
                </>
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

                    {/* Uploading Report to DB */}
                    <div className="align-items-center">
                      {/* Add the UploadForm component here */}
                      <UploadForm onPdfUpload={handlePdfUpload} />
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
        <div className="steps-container"></div>
      </div>
    </>
  );
};

export default BrainTumorForm;
