import React from "react";
import { useState, useEffect } from "react";
import "./home2.css";
import heart from "../../assets/heart2.png";
import brain from "../../assets/brain.png";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';

const Home2 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="home2-container">
      <div className="home2-center-content">
        {loaded && (
          <div className="home2-animated-text">
            <br />
            <br />
            <br />
            <h1>
              We have Amazing <span>Service.</span>
            </h1>
            <br />
            <div className="home2-content-wrapper">
              <p>
                DiagnoCare is committed to advancing healthcare practices
                through innovation and expertise.
              </p>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
      <div className="home2-row">
        <div className="home2-column">
          <div className="home2-icon-container">
            <MonitorHeartIcon sx={{ color: "#006ef7",fontSize: 30 }}/>
            {/* <img src={heart} alt="Icon" /> */}
          </div>
          <div className="home2-content">
            <h1>Diabetes Prediction</h1>
            <p>
              Predict diabetes based on numeric data entered in the form. The
              accuracy of Our Prediction Model is <span>85%</span>
            </p>
          </div>
        </div>
        <div className="home2-column">
          <div className="home2-icon-container">
            <VolunteerActivismIcon sx={{ color: "#006ef7",fontSize: 30 }}/>
            {/* <img src={heart} alt="Icon" /> */}
          </div>
          <div className="home2-content">
            <h1>Lung Cancer Prediction</h1>
            <p>
              Predict Lung Cancer based on numeric data entered in the form. The
              accuracy of Our Prediction Model is <span>94%</span>
            </p>
          </div>
        </div>
        <div className="home2-column">
          <div className="home2-icon-container">
            {/* <img src={heart} alt="Icon" /> */}
            <PsychologyAltIcon sx={{ color: "#006ef7",fontSize: 30 }}/>
          </div>
          <div className="home2-content">
            <h1>Alzheimer's Disease Prediction</h1>
            <p>
              Predict Alzheimer's based on The image provided. The
              accuracy of Our Prediction Model is <span>96%</span>
            </p>
          </div>
        </div>
        <div className="home2-column">
          <div className="home2-icon-container">
            {/* <img src={heart} alt="Icon" /> */}
            <PsychologyIcon sx={{ color: "#006ef7",fontSize: 30 }}/>
          </div>
          <div className="home2-content">
            <h1>Brain Tumuor Prediction</h1>
            <p>
            Predict Brain Tumuor based on The image provided. The
              accuracy of Our Prediction Model is <span>93%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home2;
