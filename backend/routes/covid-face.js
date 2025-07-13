const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("face"), (req, res) => {
  // Simulate COVID detection via facial symptoms
  res.json({
    diagnosis: "Possible COVID-19 Detected via Face",
    confidence: 0.79,
    tips: [
      "Check temperature regularly",
      "Consider getting a COVID test",
      "Self-isolate if symptoms worsen"
    ]
  });
});

module.exports = router;
