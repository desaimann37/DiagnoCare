import React, { useState, useEffect } from "react";
// { Carousel } from "primereact/carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./card.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { Star, MonetizationOn, Schedule } from "@mui/icons-material";
import { CropFree, FavoriteBorder, Assessment, InsertChartOutlined } from "@mui/icons-material";

const features1 = [
  {
    name: "Diabetes Prediction",
    description: "Predict diabetes based on numeric data entered in the form.",
  },
  {
    name: "Lung Cancer Prediction",
    description:
      "Predict lung cancer based on numeric data entered in the form.",
  },
  {
    name: "Generate AI Reports",
    description:
      "Generate reports using AI algorithms and download them in PDF format.",
  },
  {
    name: "Brain Tumor Prediction",
    description: "Predict brain tumors from MRI or CT scan images.",
  },
  {
    name: "Alzheimer's Disease Prediction",
    description: "Predict Alzheimer's disease from MRI or CT scan images.",
  },
  {
    name: "Patient Management",
    description: "Manage patient records, view history, and track progress.",
  },
];

const features2 = [
  {
    name: "Diabetes Prediction",
    description: "Predict diabetes based on numeric data entered in the form.",
    imageUrl: "https://a.storyblok.com/f/120667/56x89/24b54f031e/1.png",
  },
  {
    name: "Lung Cancer Prediction",
    description: "Predict lung cancer based on numeric data entered in the form.",
    imageUrl: "https://a.storyblok.com/f/120667/56x86/3361b16d83/2.png",
  },
  {
    name: "Alzheimer's Disease Prediction",
    description: "Predict Alzheimer's disease from MRI or CT scan images.",
    imageUrl: "https://a.storyblok.com/f/120667/56x89/de009af59e/3.png",
  },
  {
    name: "Brain Tumor Prediction",
    description: "Predict brain tumors from MRI or CT scan images.",
    imageUrl: "https://a.storyblok.com/f/120667/56x86/b52dee6fbc/4.png",
  },
];

export default function Cards() {
  return (
    <>
      <div className="cards">
      <Grid container spacing={10}>
        {features2.map((feature, index) => (
          <Grid key={index} item xs={12} sm={6} md={6}>
            <Card
              sx={{
                "&:hover": {
                  boxShadow:
                    "0px 0px 2cpx 0px rgba(96.000000199028,97.000000132685,99,.32)",
                  backgroundColor: "rgba(69, 123, 232, 0.227)",
                },
              }}
            >
              <CardContent sx={{ padding: "50px" }}>
                <img src={feature.imageUrl} alt={feature.name} style={{ margin: "0 40px 40px 0 ", width: "40px", height: "auto", float: "left" }} />
                <div style={{ textAlign: "left" }}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{ color: "var(--roczen-blue)" }}
                  >
                    <h3>{feature.name}</h3>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      lineHeight: "30px",
                      fontSize: "1.1em",
                      wordSpacing: "5px",
                      letterSpacing: ".7px",
                      color: "#112950",
                    }}
                  >
                    <h6>{feature.description}</h6>
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>

      <div className="functinality">
        <div className="row second-row">
          <div className="col-md-4">
            {features1.slice(0, 3).map((feature, index) => (
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
            {features1.slice(3).map((feature, index) => (
              <div key={index} className="row feature-row">
                <h3>{feature.name}</h3>
                <h6>{feature.description}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
