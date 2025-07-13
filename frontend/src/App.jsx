// src/App.jsx
import React, { useState } from "react";
import ILDDetectorPage from "./components/ILDDetectorPage";
import DiseaseDetectorPage from "./components/DiseaseDetectorPage";
import FaceScanILD from "./components/FaceScanILD";
import AnemiaEye from "./components/AnemiaEye";
import CovidFace from "./components/CovidFace";
import LiverEye from "./components/LiverEye";

export default function App() {
  const [page, setPage] = useState("unified-ild");

  const backgroundImages = {
    "ild-scan": "https://cdn.pixabay.com/photo/2016/11/09/15/27/dna-1811955_1280.jpg",
    "ild-face": "https://cdn.pixabay.com/photo/2020/01/25/05/17/face-detection-4791810_1280.jpg",
    // "unified-ild": "https://cdn.pixabay.com/photo/2023/07/19/11/23/artificial-intelligence-8136031_1280.jpg",
    // "anemia-eye": "https://cdn.pixabay.com/photo/2024/05/27/12/47/wbc-8791149_1280.jpg",
    // "covid-face": "https://cdn.pixabay.com/photo/2020/05/10/09/07/mask-5150243_1280.jpg",
    // "liver-eye": "https://cdn.pixabay.com/photo/2024/02/06/09/05/ai-generated-8556456_960_720.jpg"
  };

  const renderPage = () => {
    switch (page) {
      case "ild-scan": return <ILDDetectorPage />;
      case "ild-face": return <FaceScanILD />;
      case "unified-ild": return <DiseaseDetectorPage />;
      case "anemia-eye": return <AnemiaEye />;
      case "covid-face": return <CovidFace />;
      case "liver-eye": return <LiverEye />;
      default: return <DiseaseDetectorPage />;
    }
  };

  const currentBg = backgroundImages[page] || "";

  return (
    <div style={{ 
      width: "100vw", 
      minHeight: "100vh", 
      overflowX: "hidden", 
      backgroundImage: `url(${currentBg})`, 
      backgroundSize: "cover", 
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      color: "#fff"
    }}>
      <nav style={navStyle}>
        <button onClick={() => setPage("ild-scan")} style={buttonStyle}>ILD Scan</button>
        <button onClick={() => setPage("ild-face")} style={buttonStyle}>ILD Face</button>
        <button onClick={() => setPage("unified-ild")} style={buttonStyle}>Unified Detection</button>
      </nav>
      <div style={{ width: "100%" }}>{renderPage()}</div>
    </div>
  );
}

const navStyle = {
  display: "flex",
  justifyContent: "center",
  background: "#1f1f1f",
  padding: "1rem 0",
  gap: "10px",
  width: "100%",
  position: "sticky",
  top: 0,
  zIndex: 10
};

const buttonStyle = {
  background: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer"
};
