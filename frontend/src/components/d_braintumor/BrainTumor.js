import React, { useEffect, useState } from "react";
import brainTumour from "../../assets/brainTumour.jpg";
import BrainTumorForm from './BrainTumorForm'

const BrainTumor = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
    <div className="diabetes-container">
        <div className="diabetes-image-container">
          <img src={brainTumour} alt="Your Image" />
        </div>
        <div className="diabetes-text-container">
          {loaded && (
            <div className="diabetes-animated-text">
              <h1>
                Diagnosing <span>Brain Tumour</span> with Machine-Learning
              </h1>
              <br />
              <p className="diabetes-big-font">
                Perform a comprehensive assessment for Brain Tumour. Gather patient
                information and analyze symptoms to make informed decisions and
                provide effective treatment plans.
              </p>
            </div>
          )}
        </div>
      </div>
      <BrainTumorForm/>
</>
)
}

export default BrainTumor