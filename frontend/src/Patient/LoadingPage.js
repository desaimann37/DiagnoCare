import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <PacmanLoader color={"#36D7B7"} loading={true} size={50} />
    </div>
  );
};

export default LoadingPage;