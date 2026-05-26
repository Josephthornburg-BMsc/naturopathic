const express = require("express");
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Remedies endpoint working" });
});

module.exports = router;
