const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("face"), (req, res) => {
  // Simulated ML logic for face-based anemia detection
  res.json({
    diagnosis: "Anemia Detected via Facial Scan",
    confidence: 0.81,
    stage: "Moderate",
    tips: ["Add iron supplements", "Monitor hemoglobin", "Avoid fatigue"]
  });
});

module.exports = router;
