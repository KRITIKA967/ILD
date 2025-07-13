const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), (req, res) => {
  // Simulated ML logic for eye image
  res.json({
    diagnosis: "Mild Anemia Detected via Eye",
    confidence: 0.76,
    stage: "Mild",
    tips: ["Increase iron intake", "Eat leafy greens", "Visit a physician"]
  });
});

module.exports = router;
