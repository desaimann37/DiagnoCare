import React from "react";
import img from "../../assets/doc_home.jpg";
import "./diabetes.css";
import DiabetesForm from "./DiabetesForm";
const Diabetes = () => {
  return (
    <>
      <div className="assessment-page">
        <section className="hero">
          <img src={img} className="hero-image" />
          <div className="hero-content">
            <h1>Diabetes Assessment</h1>
            <p>
              Perform a comprehensive assessment for diabetes. Gather patient
              information and analyze symptoms to make informed decisions and
              provide effective treatment plans.
            </p>
            <button className="start-assessment-btn">Start Assessment</button>
          </div>
        </section>
      </div>
      <DiabetesForm />
    </>
  );
};

export default Diabetes;
