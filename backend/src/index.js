const express = require("express");
const cors = require("cors");

/* ---------------- NIRF MODULE IMPORTS ---------------- */
const { calculateTLR } = require("./tlr");
const { calculateRPC } = require("./engines/nirf/rpc");
const { calculateGO } = require("./engines/nirf/go");
const { calculateOI } = require("./engines/nirf/oi");
const { calculatePR } = require("./engines/nirf/pr");
const { calculateTotalNIRF } = require("./engines/nirf/total");

const app = express();
app.use(cors());
app.use(express.json());

/* =====================================================
   HEALTH CHECK
   ===================================================== */
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

/* =====================================================
   TLR – Teaching, Learning & Resources
   ===================================================== */
app.post("/api/nirf/tlr", (req, res) => {
  try {
    res.json(calculateTLR(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   RPC – Research & Professional Practice
   ===================================================== */
app.post("/api/nirf/rpc", (req, res) => {
  try {
    res.json(calculateRPC(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   GO – Graduation Outcomes
   ===================================================== */
app.post("/api/nirf/go", (req, res) => {
  try {
    res.json(calculateGO(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   OI – Outreach & Inclusivity (Phase 3)
   NOTE: Based on self-declared institutional data
   ===================================================== */
app.post("/api/nirf/oi", (req, res) => {
  try {
    res.json(calculateOI(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   PR – Perception (Phase 3)
   NOTE: Indicative only. Real NIRF uses national surveys.
   ===================================================== */
app.post("/api/nirf/pr", (req, res) => {
  try {
    res.json(calculatePR(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   TOTAL NIRF SCORE (MVP)
   OI & PR optional – handled internally
   ===================================================== */
app.post("/api/nirf/total", (req, res) => {
  try {
    const { tlr, rpc, go, oi = 0, pr = 0 } = req.body;
    res.json(calculateTotalNIRF({ tlr, rpc, go, oi, pr }));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/* =====================================================
   SERVER START
   ===================================================== */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
