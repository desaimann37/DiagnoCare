import React, { useEffect, useState } from "react";
import LungCancerForm from "./LungCancerForm";
import lungCancer from "../../assets/lungCancer.jpg";

const LungCancer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <div className="diabetes-container">
        <div className="diabetes-image-container">
          <img src={lungCancer} alt="Your Image" />
        </div>
        <div className="diabetes-text-container">
          {loaded && (
            <div className="diabetes-animated-text">
              <h1>
                Diagnosing <span>Lung Cancer</span> with Machine-Learning
              </h1>
              <br />
              <p className="diabetes-big-font">
                Perform a comprehensive assessment for Lung Cancer. Gather patient
                information and analyze symptoms to make informed decisions and
                provide effective treatment plans.
              </p>
            </div>
          )}
        </div>
      </div>
      <LungCancerForm />
    </>
  );
};

export default LungCancer;
