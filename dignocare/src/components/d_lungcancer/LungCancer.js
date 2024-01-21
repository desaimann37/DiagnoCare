import React from "react";
import img from "../../assets/doc_home.jpg";
import LungCancerForm from "./LungCancerForm";

const LungCancer = () => {
  return (
    <>
      <div className="assessment-page">
        <section className="hero">
          <img src={img} className="hero-image" />
          <div className="hero-content">
            <h1>Lung Cancer Assessment</h1>
            <p>
              Perform a comprehensive assessment for Lung Cancer. Gather patient
              information and analyze symptoms to make informed decisions and
              provide effective treatment plans.
            </p>
            <button className="start-assessment-btn">Start Assessment</button>
          </div>
        </section>
      </div>
      <LungCancerForm />
    </>
  );
};

export default LungCancer;
