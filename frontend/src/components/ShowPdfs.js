import React, { useEffect, useState } from "react";
import axios from "axios";

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
        `http://localhost:5000/store/get_pdf_pid/${props.pdfName}`
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
        `http://localhost:5000/store/open_pdf/${pdfName}`,
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
  return (
    <>
      <div>
        {patientData && (
          <div>
            <h2>Patient Details</h2>
            <p>Patient Name: {patientData.name}</p>
            <p>Patient Address: {patientData.address}</p>
            <p>Patient Phone: {patientData.phone_number}</p>
          </div>
        )}

        <h2>Patient PDFs</h2>
        <div>
          {pdfs && pdfs.map((pdf, index) => (
            <div key={index}>
              <p>PDF Name: {pdf}</p>
              <button onClick={() => openPdf(pdf)}>Open PDF</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowPdfs;
