import React, { useState } from "react";
import ReactDOM from "react-dom";
import shortid from "shortid";
import '../d_braintumor/btform.css'

const AlzheimerForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };
  
  const fileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };
  
  const handleFile = (file) => {
    if (file) {
      if (isFileTypeAllowed(file)) {
        let reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFile({
            id: shortid.generate(),
            filename: file.name,
            fileimage: reader.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Invalid file type. Please select a valid image file (jpg/jpeg).");
      }
    }
  };
  
  const isFileTypeAllowed = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg"];
    return allowedTypes.includes(file.type);
  };

  const deleteFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="fileupload-view">
      <div className="row justify-content-center m-0">
        <h1 className="fs-10 card-title fw-bold mb-4 text-center">
          Alzheimer Prediction
        </h1>
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body">
              <div
                className="kb-data-box"
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <form>
                  <div className="kb-file-upload">
                    <div className="file-upload-box">
                      <input
                        type="file"
                        id="fileupload"
                        className="file-upload-input"
                        onChange={fileChange}
                      />
                      <span>
                        Drag and drop or{" "}
                        <span className="file-link">Choose your file</span>
                      </span>
                    </div>
                  </div>
                  {selectedFile && (
                    <div className="kb-attach-box mb-3">
                      <div className="file-atc-box">
                        {selectedFile.filename.match(/.(jpg|jpeg)$/i) ? (
                          <div className="file-image">
                            {" "}
                            <img src={selectedFile.fileimage} alt="" />
                          </div>
                        ) : (
                          <div className="file-image">
                            <i className="far fa-file-alt"></i>
                          </div>
                        )}
                        <div className="file-detail">
                          <h5>{selectedFile.filename}</h5>
                          <div className="file-actions">
                            <button
                              type="button"
                              className="file-action-btn"
                              onClick={deleteFile}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">
                          Predict
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlzheimerForm;
