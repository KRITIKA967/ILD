// src/components/LiverEye.jsx
import React from "react";

const LiverEye = () => {
  return (
    <div style={{ width: "100%", margin: 0, padding: 0, backgroundColor: "#121212", color: "#fff" }}>
      <div style={heroStyle}>
        <h1 style={heroTextStyle}>Liver – Jaundice</h1>
      </div>

      <section style={sectionStyle}>
        <p style={descStyle}>
          Upload a clear close-up of eye sclera or yellowed skin.
        </p>
        <input type="file" accept="image/*" />
        <br />
        <button style={btnStyle}>Detect Liver Condition</button>
      </section>
    </div>
  );
};

const heroStyle = {
  width: "100%",
  height: "50vh",
  background: "url('https://cdn.pixabay.com/photo/2024/02/06/09/05/ai-generated-8556456_960_720.jpg') center/cover no-repeat",
  position: "relative",
};

const heroTextStyle = {
  color: "#fff",
  fontSize: "2.5rem",
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textShadow: "2px 2px 6px rgba(0,0,0,.6)"
};

const sectionStyle = {
  background: "#eaf6fc",
  textAlign: "center",
  padding: "2rem 1rem",
};

const descStyle = {
  fontSize: "1.1rem",
  color: "#333",
  marginBottom: "1rem",
};

const btnStyle = {
  marginTop: "1rem",
  padding: "10px 20px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
};

export default LiverEye;
