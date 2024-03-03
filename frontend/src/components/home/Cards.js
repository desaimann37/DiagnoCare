import React, { useState, useEffect } from "react";
import { Carousel } from "primereact/carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css'

const features = [
  {
    name: "Crop Recommendation",
    description: "Discover the best crops for your farm.",
  },
  {
    name: "Crop Yield Prediction",
    description: "Predict and plan your harvest with accuracy.",
  },
  {
    name: "Fertilizer Recommendation",
    description: "Optimize fertilizer usage for maximum yield.",
  },
  {
    name: "Soil Analysis",
    description: "Understand your soil health for effective management.",
  },
  {
    name: "Plant Disease Detection",
    description: "Detect and diagnose plant diseases early.",
  },
  {
    name: "Agribot Chat",
    description: "Get instant answers to your farming queries.",
  },
];

const diseases = [
  {
    name: "Brain Tumor",
    description:
      "A brain tumor is a mass or growth of abnormal cells in the brain.",
    image: "user.jpg",
  },
  {
    name: "Alzheimer's Disease",
    description:
      "Alzheimer's disease is a progressive disorder that causes brain cells to waste away and die.",
    image: "user.jpg",
  },
  {
    name: "Diabetes",
    description:
      "Diabetes is a chronic condition that affects how your body turns food into energy.",
    image: "user.jpg",
  },
  {
    name: "Lung Cancer",
    description: "Lung cancer is a type of cancer that begins in the lungs.",
    image: "user.jpg",
  },
];

export default function HomePage() {
  const [displayedDiseases, setDisplayedDiseases] = useState([]);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  useEffect(() => {
    setDisplayedDiseases(diseases.slice(0, 2));
  }, []);

  const diseaseTemplate = (disease) => {
    return (
      <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={require(`../../assets/${disease.image}`).default}
            alt={disease.name}
            className="w-6 shadow-2"
          />
        </div>
        <div>
          <h4 className="mb-1">{disease.name}</h4>
          <p>{disease.description}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="card">
        <Carousel
          value={displayedDiseases}
          numVisible={2}
          numScroll={2}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={diseaseTemplate}
        />
      </div>

      <div className="row second-row">
        <div className="col-md-4">
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="row feature-row left">
              <h3>{feature.name}</h3>
              <h6>{feature.description}</h6>
            </div>
          ))}
        </div>

        <div className="col-md-4 text-center">
          <div className="circular-image"></div>
        </div>

        <div className="col-md-4">
          {features.slice(3).map((feature, index) => (
            <div key={index} className="row feature-row">
              <h3>{feature.name}</h3>
              <h6>{feature.description}</h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
