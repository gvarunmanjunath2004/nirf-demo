const express = require("express");
const cors = require("cors");
const { calculateTLR } = require("./tlr");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

app.post("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

app.post("/api/nirf/tlr", (req, res) => {
  try {
    const result = calculateTLR(req.body);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
