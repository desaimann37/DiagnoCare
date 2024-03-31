import React from "react";
import notfound from "../src/assets/404.png";

const NotFoundPage = () => {
  const handleGoHome = async () => {
    const storedUserObj = localStorage.getItem("loggedin_obj");

    if (storedUserObj) {
      const userObj = JSON.parse(storedUserObj);

      if (userObj.role === "patient") {
        window.location.href = "/patient";
      } else if (userObj.role === "doctor") {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh",
        textAlign: "center",
      }}
    >
        <b className="layout-logo">
              Diagno<span>Care</span>
            </b>
            <br/>
      <h5>No, no, no, nothing's here,</h5>{" "}
      <span
        onClick={handleGoHome}
        style={{
          color: "var(--roczen-blue)",
          cursor: "pointer",
        }}
      >
        <h5>Let's Go Home</h5>
      </span>
      <img src={notfound} alt="notFound" style={{ maxWidth: "37%", marginTop: "20px" }} />
    </div>
  );
};

export default NotFoundPage;
