import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const UploadForm = ({ onPdfUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: "error",
        title: "No file selected",
        text: "Please select a PDF file to upload.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(
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
          title: "PDF uploaded",
          text: "PDF uploaded successfully!",
          showConfirmButton: true,
        }).then(() => {
          setFile(null);
          onPdfUpload(response.data);
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

  return (
    <div>
      <form
        className="needs-validation"
        noValidate
        autoComplete="off"
        onSubmit={handleUpload}
      >
        <div className="mb-3">
          <label className="mb-2 label-large" htmlFor="UploadPdf">
            Upload PDF <span>*</span>
          </label>
          <input
            id="UploadPdf"
            type="file"
            accept="pdf/*"
            className="form-control"
            name="Uploadpdf"
            onChange={handleFileChange}
            required
          />
          <div className="invalid-feedback">Image is required</div>
        </div>

        <div className="align-items-center">
          <button type="submit" className="btn btn-primary">
            Upload Pdf
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
