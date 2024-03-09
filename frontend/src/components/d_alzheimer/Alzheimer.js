import React, { useEffect, useState } from "react";
import AlzheimerForm from "./AlzheimerForm";
import alzheimer from "../../assets/alzheimer.jpg";

const Alzheimer = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <div className="diabetes-container">
        <div className="diabetes-image-container">
          <img src={alzheimer} alt="Your Image" />
        </div>
        <div className="diabetes-text-container">
          {loaded && (
            <div className="diabetes-animated-text">
              <h1>
                Diagnosing <span>Alzheimer's</span> with Machine-Learning
              </h1>
              <br />
              <p className="diabetes-big-font">
                Perform a comprehensive assessment for Alzheimer's. Gather patient
                information and analyze symptoms to make informed decisions and
                provide effective treatment plans.
              </p>
            </div>
          )}
        </div>
      </div>
      <AlzheimerForm />
    </>
  );
};

export default Alzheimer;
