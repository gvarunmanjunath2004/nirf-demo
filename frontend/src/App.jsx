import { useState } from "react";

const BACKEND_URL = "https://nirf-backend.onrender.com";

function App() {
  /* ---------------- TLR STATE ---------------- */
  const [tlrResult, setTlrResult] = useState(null);
  const [loadingTLR, setLoadingTLR] = useState(false);
  const [errorTLR, setErrorTLR] = useState("");

  /* ---------------- RPC STATE ---------------- */
  const [rpcResult, setRpcResult] = useState(null);
  const [loadingRPC, setLoadingRPC] = useState(false);
  const [errorRPC, setErrorRPC] = useState("");

  /* ---------------- TLR API ---------------- */
  const calculateTLR = async () => {
    setLoadingTLR(true);
    setErrorTLR("");

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/nirf/tlr`,
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
      setTlrResult(data);
    } catch (err) {
      setErrorTLR("TLR backend not reachable");
    } finally {
      setLoadingTLR(false);
    }
  };

  /* ---------------- RPC API ---------------- */
  const calculateRPC = async () => {
    setLoadingRPC(true);
    setErrorRPC("");

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/nirf/rpc`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            publications: 120,
            citations: 1400,
            patents: 8,
            sponsored: 200,
          }),
        }
      );

      const data = await response.json();
      setRpcResult(data);
    } catch (err) {
      setErrorRPC("RPC backend not reachable");
    } finally {
      setLoadingRPC(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>📊 NIRF Calculator (Live Demo)</h1>
      <p>Connected to live Render backend</p>

      {/* ========== TLR SECTION ========== */}
      <h2>TLR – Teaching, Learning & Resources</h2>

      <button onClick={calculateTLR}>
        {loadingTLR ? "Calculating..." : "Calculate TLR"}
      </button>

      {errorTLR && <p style={{ color: "red" }}>{errorTLR}</p>}

      {tlrResult && (
        <div style={boxStyle}>
          <h3>TLR Score: {tlrResult.score}</h3>
          <ul>
            <li>FSR: {tlrResult.components.fsr}</li>
            <li>FQE: {tlrResult.components.fqe}</li>
            <li>FRU: {tlrResult.components.fru}</li>
            <li>TF: {tlrResult.components.tf}</li>
            <li>FD: {tlrResult.components.fd}</li>
            <li>SI: {tlrResult.components.si}</li>
          </ul>
        </div>
      )}

      <hr style={{ margin: "40px 0" }} />

      {/* ========== RPC SECTION ========== */}
      <h2>RPC – Research & Professional Practice</h2>

      <button onClick={calculateRPC}>
        {loadingRPC ? "Calculating..." : "Calculate RPC"}
      </button>

      {errorRPC && <p style={{ color: "red" }}>{errorRPC}</p>}

      {rpcResult && (
        <div style={boxStyle}>
          <h3>RPC Score: {rpcResult.score}</h3>
          <ul>
            <li>Publications: {rpcResult.components.publications}</li>
            <li>Citations: {rpcResult.components.citations}</li>
            <li>Patents: {rpcResult.components.patents}</li>
            <li>Sponsored Research: {rpcResult.components.sponsored}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

const boxStyle = {
  marginTop: 20,
  padding: 20,
  border: "1px solid #ccc",
  borderRadius: 8,
  width: 420,
};

export default App;
