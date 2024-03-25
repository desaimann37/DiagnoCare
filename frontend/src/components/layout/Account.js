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

import user from "../../assets/user.jpg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Account = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccountName, setNewAccountName] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

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

  useEffect(() => {
    // Fetch account list from the backend
    fetch('http://127.0.0.1:5000/users/doctor/list?page=1&per_page=100' , {
      headers:{
        'Authorization' : `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
      .then(response => response.json())
      .then(data => setAccounts(data))
      .catch(error => console.error('Error fetching accounts:', error));
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    window.location = "/alzheimer";
    setOpen(false);
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

  const handleAddAccount = () => {
    // Create a new account on the backend
    fetch('/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newAccountName }),
    })
      .then(response => response.json())
      .then(newAccount => setAccounts([...accounts, newAccount]))
      .catch(error => console.error('Error adding account:', error));

    // Clear the input field
    setNewAccountName('');
  };

  const handleUpdateAccount = (accountId, updatedName) => {
    // Update an existing account on the backend
    fetch(`/account/${accountId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName }),
    })
      .then(response => response.json())
      .then(updatedAccount => {
        // Update the state with the modified account
        setAccounts(accounts.map(account => (account.id === accountId ? updatedAccount : account)));
      })
      .catch(error => console.error('Error updating account:', error));
  };

  const handleDeleteAccount = accountId => {
    // Delete an account on the backend
    fetch(`/account/${accountId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the deleted account from the state
          setAccounts(accounts.filter(account => account.id !== accountId));
        } else {
          console.error('Error deleting account:', response.statusText);
        }
      })
      .catch(error => console.error('Error deleting account:', error));
  };

  return (
    <div>
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
                  <img src={user} alt="user"/>
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
      </Container>
    </div>
  );
};

export default Account;
