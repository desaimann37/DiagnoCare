import React from "react";
import { useState, useEffect } from "react";
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
            Empower Your  <span>Health Journey</span>   with Personalized Care
            </h1>
            <br />
            <p className="home1-big-font">
              Discover DiagnoCare, Your Trusted Partner in Healthcare. Access
              top doctors, predictive diagnostics, and seamless appointment
              scheduling. Take control of your well-being with precision and
              confidence.
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
