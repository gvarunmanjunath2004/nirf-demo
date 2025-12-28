const express = require("express");
const cors = require("cors");

const { calculateTLR } = require("./tlr");
const { calculateRPC } = require("./engines/nirf/rpc");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

app.post("/api/nirf/tlr", (req, res) => {
  res.json(calculateTLR(req.body));
});

app.post("/api/nirf/rpc", (req, res) => {
  res.json(calculateRPC(req.body));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
