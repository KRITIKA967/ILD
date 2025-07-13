// src/components/DiseaseDetectorPage.jsx
import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const MODES = [
  {
    key: "anemia_eye",
    label: "Anemia – Eye/Sclera",
    route: "/predict-anemia-sclera",
    needsWebcam: false,
    hint: "Upload a clear photo of the inner eyelid or sclera.",
    bg: "https://cdn.pixabay.com/photo/2024/05/27/12/47/wbc-8791149_1280.jpg"
  },
  {
    key: "anemia_face",
    label: "Anemia – Face",
    route: "/predict-anemia-face",
    needsWebcam: true,
    hint: "Capture or upload a frontal face image.",
    bg: "https://cdn.pixabay.com/photo/2024/12/16/17/07/blood-9271217_1280.jpg"
  },
  {
    key: "covid_face",
    label: "COVID‑19 – Face",
    route: "/predict-covid-face",
    needsWebcam: true,
    hint: "Capture or upload a frontal face image.",
    bg: "https://cdn.pixabay.com/photo/2020/07/13/16/19/corona-5401250_960_720.jpg"
  },
  {
    key: "liver_eye",
    label: "Liver – Jaundice",
    route: "/predict-liver-jaundice",
    needsWebcam: false,
    hint: "Upload a clear close‑up of eye sclera or yellowed skin.",
    bg: "https://cdn.pixabay.com/photo/2024/02/06/09/05/ai-generated-8556456_960_720.jpg"
  },
];

export default function DiseaseDetectorPage() {
  const [modeKey, setModeKey] = useState("anemia_eye");
  const mode = MODES.find((m) => m.key === modeKey);

  const webcamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [stage, setStage] = useState("");
  const [tips, setTips] = useState([]);

  const heroStyle = {
    width: "100%",
    height: "60vh",
    background: `url('${mode.bg}') center/cover no-repeat`,
    position: "relative",
  };

  const btnBase = {
    background: "linear-gradient(to right, #007bff , #00d4ff)",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: 8,
    fontWeight: "bold",
    cursor: "pointer",
    margin: "0 6px",
  };

  const resetAll = () => {
    setPreview(null);
    setFile(null);
    setDiagnosis("");
    setConfidence(null);
    setStage("");
    setTips([]);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const [meta, b64] = dataurl.split(",");
    const mime = meta.match(/:(.*?);/)[1];
    const bin = atob(b64);
    const buf = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
    return new File([buf], filename, { type: mime });
  };

  const handleCapture = () => {
    const img = webcamRef.current?.getScreenshot();
    if (!img) return;
    setPreview(img);
    setFile(dataURLtoFile(img, "capture.jpg"));
    setDiagnosis("");
  };

  const handleFileChange = (e) => {
    const chosen = e.target.files[0];
    if (!chosen) return;
    setPreview(URL.createObjectURL(chosen));
    setFile(chosen);
    setDiagnosis("");
  };

  const handleDetect = async () => {
    if (!file) return alert("Capture or upload an image first.");
    const fd = new FormData();
    const key = mode.needsWebcam ? "face" : "image";
    fd.append(key, file);

    setLoading(true);
    try {
      const { data } = await axios.post(`http://localhost:5000${mode.route}`, fd);
      setDiagnosis(data.diagnosis);
      setConfidence(data.confidence);
      setStage(data.stage || "");
      setTips(data.tips || []);
    } catch (err) {
      console.error(err);
      setDiagnosis("❌ Server error");
      setConfidence(0);
      setStage("");
      setTips(["Try again later."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ background: "#2d2d2d", padding: "0.8rem", textAlign: "center" }}>
        {MODES.map((m) => (
          <button
            key={m.key}
            onClick={() => {
              setModeKey(m.key);
              resetAll();
            }}
            style={{
              ...btnBase,
              background: modeKey === m.key ? "#00dfd8" : "#6c757d",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div style={heroStyle}>
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            color: "#fff",
            fontSize: "2.6rem",
            fontWeight: "bold",
            textAlign: "center",
            textShadow: "2px 2px 6px rgba(0,0,0,.6)",
            maxWidth: "90%",
          }}
        >
          {mode.label}
        </h1>
      </div>

      <section style={{ background: "#eaf6fc", textAlign: "center", padding: "2rem 1rem" }}>
        <p style={{ maxWidth: 650, margin: "0 auto 1.5rem", fontSize: "1.1rem", color: "#333" }}>
          {mode.hint}
        </p>

        {mode.needsWebcam ? (
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={300}
              height={240}
              style={{ borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,.15)" }}
            />
            {preview && (
              <img
                src={preview}
                alt="preview"
                width={300}
                height={240}
                style={{ borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,.15)" }}
              />
            )}
          </div>
        ) : (
          <>
            {preview && (
              <img
                src={preview}
                alt="preview"
                width={300}
                height={240}
                style={{
                  borderRadius: 8,
                  boxShadow: "0 2px 10px rgba(0,0,0,.15)",
                  marginBottom: 16,
                }}
              />
            )}
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} style={btnBase} />
          </>
        )}

        <div style={{ marginTop: 18 }}>
          {mode.needsWebcam && (
            <button onClick={handleCapture} style={{ ...btnBase, background: "#007bff" }}>
              📷 Capture
            </button>
          )}
          <button onClick={handleDetect} disabled={loading} style={btnBase}>
            {loading ? "Analyzing…" : "Detect"}
          </button>
        </div>
      </section>

      {diagnosis && (
        <section
          style={{
            background: "#fff",
            maxWidth: 720,
            margin: "2rem auto",
            padding: "1.5rem",
            borderRadius: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            color: "#333",
          }}
        >
          <h2 style={{ color: "#007bff", marginBottom: 16 }}>Diagnosis Report</h2>
          <p>
            <strong>Condition:</strong> {diagnosis}
          </p>
          <p>
            <strong>Confidence:</strong> {(confidence * 100).toFixed(1)}%
          </p>
          {stage && (
            <p>
              <strong>Stage:</strong> {stage}
            </p>
          )}
          {tips.length > 0 && (
            <div
              style={{
                marginTop: 16,
                background: "#f0f8ff",
                padding: 16,
                borderRadius: 8,
              }}
            >
              <h4 style={{ marginBottom: 8 }}>AI Recommendations:</h4>
              <ul style={{ paddingLeft: 20, margin: 0 }}>
                {tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </>
  );
}
