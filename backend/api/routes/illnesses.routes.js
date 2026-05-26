const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const illnesses = [
    { id: 1, name: "Flu" },
    { id: 2, name: "Cold" },
    { id: 3, name: "Allergies" }
  ];

  res.json(illnesses);
});

module.exports = router;
