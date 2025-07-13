// src/components/ILDDetectorPage.jsx
import React, { useState } from "react";
import axios from "axios";

const ILDDetectorPage = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [diagnosis, setDiagnosis] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [stage, setStage] = useState("");
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const onFileChange = (e) => {
    const selected = Array.from(e.target.files).slice(0, 2);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
    resetResults();
  };

  const resetResults = () => {
    setDiagnosis("");
    setConfidence(null);
    setStage("");
    setTips([]);
  };

  const detectILD = async () => {
    if (files.length === 0) return alert("Please select images first.");
    const fd = new FormData();
    files.forEach((file, idx) => fd.append(`image${idx + 1}`, file));
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", fd);
      const { diagnosis, confidence, stage, tips } = res.data;
      setDiagnosis(diagnosis);
      setConfidence(confidence);
      setStage(stage);
      setTips(tips);
    } catch (err) {
      console.error(err);
      setDiagnosis("❌ Server error");
      setConfidence(0);
      setTips(["Try again later."]);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div style={{ width: "100vw", overflowX: "hidden" }}>
    <div style={heroStyle}>
      <h1 style={heroTextStyle}>ILD Detection – Scan Upload</h1>
    </div>

    <section style={sectionStyle}>
      <p style={descStyle}>
        Upload up to 2 CT/X-ray images. Our AI will analyze and diagnose ILD.
      </p>
      <input type="file" accept="image/*" multiple onChange={onFileChange} />
      <br />
      <button onClick={detectILD} disabled={loading} style={btnStyle}>
        {loading ? "Analyzing…" : "Detect ILD"}
      </button>

      {previews.length > 0 && (
        <div style={previewContainer}>
          {previews.map((src, i) => (
            <img key={i} src={src} alt={`preview-${i}`} style={previewStyle} />
          ))}
        </div>
      )}
    </section>

    {diagnosis && (
      <section style={resultBox}>
        <h2>Diagnosis Report</h2>
        <p><strong>Condition:</strong> {diagnosis}</p>
        <p><strong>Confidence:</strong> {(confidence * 100).toFixed(1)}%</p>
        {stage && <p><strong>Stage:</strong> {stage}</p>}
        {tips.length > 0 && (
          <ul>{tips.map((tip, i) => <li key={i}>{tip}</li>)}</ul>
        )}
      </section>
    )}
  </div>
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
  width: "100%",
  background: "#000203ff",
  textAlign: "center",
  padding: "2rem 1rem",
};
const descStyle = {
  fontSize: "1.1rem",
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

const previewContainer = {
  display: "flex",
  justifyContent: "center",
  gap: "12px",
  marginTop: "20px",
};

const previewStyle = {
  width: 280,
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

export default ILDDetectorPage;

