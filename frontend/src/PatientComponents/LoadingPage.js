import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import CircularProgress from '@mui/material/CircularProgress';

const LoadingPage = () => {
  return (
    <div className="loader-container">
          <CircularProgress size={80} /> 
        </div>
  );
};

export default LoadingPage;