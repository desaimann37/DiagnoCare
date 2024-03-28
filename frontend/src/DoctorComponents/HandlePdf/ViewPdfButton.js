import { useState } from "react";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddPatient from "../AddPatient";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import ShowPdfs from "./ShowPdfs";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ViewPdfButton = ({ pdfName }) => {
  const [pdfData, setPdfData] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleViewPdf = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/store/get_pdf/${pdfName}`,
        { responseType: "arraybuffer" }
      );

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
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Patient Detail
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
          <ShowPdfs handleClose={handleClose} pdfName={pdfName} />
          
        </DialogContent>
      </BootstrapDialog>
      {/* <button type="button" className="btn btn-secondary" onClick={handleViewPdf}> */}
      <Button
        variant="outlined"
        color="primary"
        startIcon={<VisibilityIcon />}
        onClick={handleClickOpen}
      >
        View
      </Button>
    </>
  );
};

export default ViewPdfButton;
