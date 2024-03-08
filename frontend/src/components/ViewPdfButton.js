import { useState } from 'react';
import axios from 'axios';

const ViewPdfButton = ({ pdfName }) => {
  const [pdfData, setPdfData] = useState('');

  const handleViewPdf = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/store/get_pdf/${pdfName}`, { responseType: 'arraybuffer' });

      // Convert the array buffer to a base64 string
      const pdfBase64 = btoa(
        new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      setPdfData(pdfBase64);
    

      const base64String = pdfBase64.toString();

      // Step 1: Decode Base64 to Binary
      const binaryString = atob(base64String);
      
      // Step 2: Convert Binary to Blob
      const blob = new Blob([new Uint8Array([...binaryString].map((char) => char.charCodeAt(0)))], { type: 'application/pdf' });
      
      // Step 3: Generate Blob URL
      const blobUrl = URL.createObjectURL(blob);
      
      // Step 4: Open a New Window or Tab
      const newWindow = window.open(blobUrl, '_blank');
      
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  };

  return (
    <button type="button" className="btn btn-secondary" onClick={handleViewPdf}>
      View PDF
    </button>
  );
};

export default ViewPdfButton;
