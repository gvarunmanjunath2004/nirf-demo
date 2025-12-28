
const express = require("express");
const cors = require("cors");

const { calculateTLR } = require("./tlr");
const { calculateRPC } = require("./engines/nirf/rpc");
const { calculateGO } = require("./engines/nirf/go");

const app = express();
app.use(cors());
app.use(express.json());

/* -------- Health Check -------- */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

/* -------- TLR -------- */
app.post("/api/nirf/tlr", (req, res) => {
  try {
    res.json(calculateTLR(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------- RPC -------- */
app.post("/api/nirf/rpc", (req, res) => {
  try {
    res.json(calculateRPC(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* -------- GO -------- */
app.post("/api/nirf/go", (req, res) => {
  try {
    res.json(calculateGO(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
