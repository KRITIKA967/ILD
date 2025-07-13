// src/components/FaceScanILD.jsx
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const FaceScanILD = () => {
  const webcamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const dataURLtoFile = (dataurl, filename) => {
    const [meta, b64] = dataurl.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bin = atob(b64);
    const buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return new File([buf], filename, { type: mime });
  };

  const capture = () => {
    const img = webcamRef.current?.getScreenshot();
    if (!img) return;
    setPreview(img);
    setFile(dataURLtoFile(img, "face.jpg"));
    setResult(null);
  };

  const detectILD = async () => {
    if (!file) return alert("Capture face first.");
    const fd = new FormData();
    fd.append("face", file);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/face-predict", fd);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({
        diagnosis: "❌ Server Error",
        confidence: 0,
        tips: ["Try again later."]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={heroStyle}>
        <h1 style={heroTextStyle}>ILD Detection – Face Scan</h1>
      </div>

      <section style={sectionStyle}>
        <p style={descStyle}>Use your webcam to capture a face image and detect ILD symptoms.</p>

        <div style={previewContainer}>
          <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={320} height={240} style={previewStyle} />
          {preview && <img src={preview} alt="Captured" width={320} height={240} style={previewStyle} />}
        </div>

        <div style={{ marginTop: 16 }}>
          <button onClick={capture} style={btnStyle}>📷 Capture</button>
          <button onClick={detectILD} style={btnStyle} disabled={loading}>
            {loading ? "Analyzing..." : "Detect ILD"}
          </button>
        </div>
      </section>

      {result && (
        <section style={resultBox}>
          <h2>Diagnosis Report</h2>
          <p><strong>Condition:</strong> {result.diagnosis}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(1)}%</p>
          <div>
            <h4>AI Recommendations:</h4>
            <ul>{(result.tips || []).map((tip, i) => <li key={i}>{tip}</li>)}</ul>
          </div>
        </section>
      )}
    </>
  );
};

const heroStyle = {
  width: "100%",
  height: "60vh",
  // background: "url('https://cdn.pixabay.com/photo/2024/02/06/09/05/ai-generated-8556456_960_720.jpg') center/cover no-repeat",
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
  background: "#000000ff",
  textAlign: "center",
  padding: "2rem 1rem",
};

const descStyle = {
  fontSize: "1.1rem",
  marginBottom: "1rem",
};

const btnStyle = {
  margin: "0 10px",
  padding: "10px 20px",
  background: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
};

const previewContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginBottom: "1rem"
};

const previewStyle = {
  borderRadius: 8,
  boxShadow: "0 2px 10px rgba(0,0,0,.15)",
};

const resultBox = {
  background: "#fff",
  maxWidth: 700,
  margin: "2rem auto",
  padding: "1.5rem",
  borderRadius: 12,
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  color: "#333",
};

export default FaceScanILD;
