import React from "react";
import { useState, useEffect } from "react";
import "./home1.css";
import doc5 from "../../assets/doc5.jpg";

const Home1 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="home1-container">
      <div className="home1-text-container">
        {loaded && (
          <div className="home1-animated-text">
            <h1>
              Precision <span>Diagnosis</span> with Industry-Leading Expertise
            </h1>
            <br/>
            <p className="home1-big-font">
              Welcome to DiagnoCare, your precision diagnostic tool. Predict
              diseases, maintain patient histories, revolutionize care. With
              unparalleled efficiency and accuracy, elevate your medical
              practice today.
            </p>
          </div>
        )}
      </div>
      <div className="home1-image-container">
        <img src={doc5} alt="Your Image" />
      </div>
    </div>
  );
};

export default Home1;
