const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), (req, res) => {
  // Simulate Liver/Jaundice detection
  res.json({
    diagnosis: "Signs of Jaundice Detected",
    confidence: 0.83,
    stage: "Early",
    tips: [
      "Consult a hepatologist",
      "Get liver function tests done",
      "Avoid alcohol and fatty foods"
    ]
  });
});

module.exports = router;
