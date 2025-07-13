const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route imports
const ildScanRoutes = require("./routes/ildScan");
const ildFaceRoutes = require("./routes/ildFace");
const anemiaEyeRoutes = require("./routes/anemiaEye");
const anemiaFaceRoutes = require("./routes/anemiaFace");
const covidFaceRoutes = require("./routes/covid-face");           // ✅ COVID Face
const liverJaundiceRoutes = require("./routes/liver-jaundice");   // ✅ Liver Jaundice

// Routes mounting
app.use("/predict", ildScanRoutes);               // ILD Scan
app.use("/face-predict", ildFaceRoutes);          // ILD Face

app.use("/predict-anemia-sclera", anemiaEyeRoutes);   // Anemia Eye
app.use("/predict-anemia-face", anemiaFaceRoutes);    // Anemia Face

app.use("/predict-covid-face", covidFaceRoutes);      // ✅ COVID Face
app.use("/predict-liver-jaundice", liverJaundiceRoutes); // ✅ Liver – Jaundice

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
