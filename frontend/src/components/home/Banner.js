import React from "react";
import "./banner.css";
import "./gradientbg.css";

const Banner = () => {
  return (
    <>
      <div className="centered-container">
      <div className="corner-image left-bottom"></div>
      <div className="corner-image right-top"></div>
        <h1>Precision Diagnosis with Industry-Leading Expertise</h1>
        <p>
          DiagnoCare is designed to assist healthcare professionals in diagnosing various
          medical conditions with unparalleled precision and efficiency.
        </p>
        <a href="#your-link" className="btn-primary">
          Your Button
        </a>
      </div>
      <div className="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>
          <div className="interactive"></div>
        </div>
      </div>
    </>
  );
};

export default Banner;