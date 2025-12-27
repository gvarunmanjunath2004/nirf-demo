import { useState } from "react";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateTLR = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:3001/api/nirf/tlr",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fsr: 18,
            fqe: 0.75,
            fru: 0.8,
            tf: 70,
            fd: 60,
            si: 80,
          }),
        }
      );

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>📊 NIRF TLR Calculator (Demo)</h1>
      <p>Live backend → real NIRF logic</p>

      <button
        onClick={calculateTLR}
        style={{
          padding: "10px 20px",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        {loading ? "Calculating..." : "Calculate TLR"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div
          style={{
            marginTop: 30,
            padding: 20,
            border: "1px solid #ccc",
            borderRadius: 8,
            width: 400,
          }}
        >
          <h2>TLR Score: {result.score}</h2>

          <h3>Breakdown</h3>
          <ul>
            <li>FSR: {result.components.fsr}</li>
            <li>FQE: {result.components.fqe}</li>
            <li>FRU: {result.components.fru}</li>
            <li>TF: {result.components.tf}</li>
            <li>FD: {result.components.fd}</li>
            <li>SI: {result.components.si}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
