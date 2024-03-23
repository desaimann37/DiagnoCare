import React from 'react'
import { useState, useEffect } from "react";
import desktop from "../../assets/desktop.png";

const Home3 = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setLoaded(true);
    }, []);
  
    return (
      <div className="home3-container">
        <div className="home3-image-container">
          <img src={desktop} alt="Your Image" />
        </div>
        <div className="home3-text-container">
          {loaded && (
            <div className="home3-animated-text">
              <h1>
                Easy to <span>Get Started</span>
              </h1>
              <br />
              <h3>01. Register</h3>
              <p className="home3-big-font">
              Create an account by providing all the details.
              </p><br/>
              <h3>02. Select Patient</h3>
              <p className="home3-big-font">
                Select the patient whom you want to diagnosis.
              </p><br/>
              <h3>03. Disease Details</h3>
              <p className="home3-big-font">
                Enter the details of the disease and click on diagnosis button.
              </p><br/>
              <h3>04. Generate Report</h3>
              <p className="home3-big-font">
                Generate report of the patient and download it in PDF form.
              </p><br/>
            </div>
          )}
        </div>
      </div>
    );
}

export default Home3