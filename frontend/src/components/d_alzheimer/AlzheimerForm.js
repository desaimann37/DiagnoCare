import React, { useState, useEffect } from "react";
import "../d_braintumor/btform.css";
import "./toast.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import loader from "../../assets/Spinner-2.gif";
import { jsPDF } from "jspdf";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Checkbox,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import Form from "../Form";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AlzheimerForm = () => {
  const [formData, setFormData] = useState({
    AlzheimerImage: null,
  });
  const [Symptoms, setSymptoms] = useState();
  const [predicted_category, setpredicted_category] = useState();
  const [Treatment, setTreatment] = useState();
  const [Recommendation, setRecommendation] = useState();
  const [loading, setLoading] = useState(false);

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const fetchTests = async () => {
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
    fetchTests();
  }, []);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    window.location = "/alzheimer";
    setOpen(false);
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

  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

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
        setSelectedPatient({
          name: response.data.name,
          address: response.data.address,
          phone: response.data.phone_number,
        });
        console.log(response.data.name);
        console.log(response.data.address);
        console.log(response.data.phone_number);
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
          Modal title
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
          <Form handleClose={handleClose} />
        </DialogContent>
      </BootstrapDialog>
      <Container style={{ marginTop: "100px" }}>
        <Grid
          container
          spacing={3}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" component="h1" gutterBottom>
              Patients List
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              onClick={handleClickOpen}
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
            >
              Add Patient
            </Button>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 250 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <b>#</b>
                </TableCell>
                <TableCell>
                  <b>Name</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow key={patient._id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRow === index}
                      onChange={() => handleRowSelect(index, patient._id)}
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/test/${patient._id}`}
                      variant="outlined"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedPatient && (
          <div>
            <Container style={{ marginTop: "100px" }}>
              <Grid>
                <Grid item>
                  <Typography
                    variant="h4"
                    component="h1"
                    marginLeft={"-3%"}
                    gutterBottom
                  >
                    Selected Patient details
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <div>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Name</b>
                      </TableCell>
                      <TableCell>
                        <b>Address</b>
                      </TableCell>
                      <TableCell>
                        <b>Phone Number</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{selectedPatient["name"]}</TableCell>
                      <TableCell>{selectedPatient["address"]}</TableCell>
                      <TableCell>{selectedPatient["phone"]}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        )}
      </Container>
      <div className="d-form-container">
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
    </>
  );
};

export default AlzheimerForm;
