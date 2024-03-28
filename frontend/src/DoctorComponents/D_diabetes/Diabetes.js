import React, { useEffect, useState } from "react";
import "./diabetes.css";
import DiabetesForm from "./DiabetesForm";
import diabetes from "../../assets/diabetes.jpg";

const Diabetes = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <div className="diabetes-container">
        <div className="diabetes-image-container">
          <img src={diabetes} alt="Your Image" />
        </div>
        <div className="diabetes-text-container">
          {loaded && (
            <div className="diabetes-animated-text">
              <h1>
                Diagnosing <span>Diabetes</span> with Machine-Learning
              </h1>
              <br />
              <p className="diabetes-big-font">
                Perform a comprehensive assessment for diabetes. Gather patient
                information and analyze symptoms to make informed decisions and
                provide effective treatment plans.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* <div className="assessment-page">
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
      </div> */}
      <DiabetesForm />
    </>
  );
};

export default Diabetes;
