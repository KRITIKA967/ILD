// src/components/AnemiaEye.jsx
import React from "react";

export default function AnemiaEye() {
  return (
    <div style={{ padding: 32, textAlign: "center", color: "white" }}>
      <h1>Anemia Detection via Eye/Sclera</h1>
      <p>This component will handle image upload or webcam capture and send it to /predict-anemia-sclera.</p>
    </div>
  );
}
const heroStyle = {
  width: "100%",
  height: "50vh",
  // background: "url('https://your-image-link.jpg') center/cover no-repeat",
  position: "relative",
};

