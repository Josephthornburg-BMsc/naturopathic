const express = require("express");
const cors = require("cors");

const illnessesRoutes = require("./api/routes/illnesses.routes");
const remediesRoutes = require("./api/routes/remedies.routes");
const symptomsRoutes = require("./api/routes/symptoms.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/illnesses", illnessesRoutes);
app.use("/api/remedies", remediesRoutes);
app.use("/api/symptoms", symptomsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Naturopathic API is running",
    endpoints: {
      illnesses: "/api/illnesses",
      remedies: "/api/remedies",
      symptoms: "/api/symptoms"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
