const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("face"), (req, res) => {
  // Simulated logic (replace with ML model logic later)
  res.json({
    diagnosis: "ILD Facial Symptoms Detected",
    confidence: 0.83,
    tips: ["Consult respiratory specialist", "Track symptoms regularly"]
  });
});

module.exports = router;
