const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.any(), (req, res) => {
  // Simulated logic (replace with ML model logic later)
  res.json({
    diagnosis: "ILD Detected",
    confidence: 0.89,
    stage: "Moderate",
    tips: ["Consult a pulmonologist", "Avoid polluted areas", "Maintain hydration"]
  });
});

module.exports = router;
