import React, { useEffect, useState } from "react";
import axios from "axios";
import './showpdf.css'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

const ShowPdfs = (props) => {
  const [pdfData, setPdfData] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    fetchPatientDetails();
  }, []);

  const fetchPatientDetails = async () => {
    try {
      const response = await axios.get(
        `https://ishapaghdal-DiagnoCare.hf.space/store/get_pdf_pid/${props.pdfName}`
      );

      setPatientData(response.data.patient);
      setPdfs(response.data.document);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  const openPdf = async (pdfName) => {
    try {
      const response = await axios.get(
        `https://ishapaghdal-DiagnoCare.hf.space/store/open_pdf/${pdfName}`,
        { responseType: "arraybuffer" }
      );

      console.log(response);

      // Convert the array buffer to a base64 string
      const pdfBase64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );

      setPdfData(pdfBase64);

      const base64String = pdfBase64.toString();

      // Step 1: Decode Base64 to Binary
      const binaryString = atob(base64String);

      // Step 2: Convert Binary to Blob
      const blob = new Blob(
        [new Uint8Array([...binaryString].map((char) => char.charCodeAt(0)))],
        { type: "application/pdf" }
      );

      // Step 3: Generate Blob URL
      const blobUrl = URL.createObjectURL(blob);

      // Step 4: Open a New Window or Tab
      const newWindow = window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  const handleDelete = async(pdf)=>{
   try {
    const response = await axios.delete(
      `https://ishapaghdal-DiagnoCare.hf.space/store/delete_pdf/${pdf}`
    );

    // Update the state to remove the deleted PDF
    setPdfs(prevPdfs => prevPdfs.filter(item => item !== pdf));
    
    console.log(response);
   }catch (error) {
    console.error("Error deleting PDF:", error);
  }
  }
  return (
    <>
  <div className="patient-details-container">
    {patientData && (
      <div className="patient-pdfs-section">
        <h2 style={{ fontSize: '40px', fontFamily: 'Inter, sans-serif', fontWeight: 800, color: 'var(--title-blue)' }}>Patient Details</h2>
        < p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif', fontWeight: 200, color: 'var(--content-grey)' }}>Patient Name: {patientData.name}
        <br/>Patient Address: {patientData.address}
        <br/>Patient Phone: {patientData.phone_number}</p>
      </div>
    )}

    <div className="patient-pdfs-section">
    <h2 style={{ fontSize: '40px', fontFamily: 'Inter, sans-serif', fontWeight: 800, color: 'var(--title-blue)' }}>Patient Reports</h2>
      {pdfs && pdfs.map((pdf, index) => (
        <div key={index} className="pdf-item">
          <p style={{ fontSize: '20px', fontFamily: 'Inter, sans-serif', fontWeight: 200, color: 'var(--content-grey)' }}>PDF Name: {pdf}</p>
          <button className="btn btn2-primary" onClick={() => openPdf(pdf)}>Open PDF</button>
          <IconButton aria-label="delete" style={{ marginLeft: '45%' }} onClick={() => handleDelete(pdf)}>
              <DeleteIcon />
          </IconButton>
        </div>
      
      ))}
    </div>
  </div>
</>

  );
};

export default ShowPdfs;
