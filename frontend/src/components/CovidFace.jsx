// src/components/CovidFace.jsx
import React from "react";

export default function CovidFace() {
  return (
    <div style={{ padding: 32, textAlign: "center", color: "white" }}>
      <h1>COVID-19 Detection from Face</h1>
      <p>This component will handle webcam capture or image upload and send it to /predict-covid-face.</p>
    </div>
  );
}
const heroStyle = {
  width: "100%",
  height: "50vh",
  background: "url('https://your-image-link.jpg') center/cover no-repeat",
  position: "relative",
};
