import { useState } from "react";

const BACKEND_URL = "https://nirf-backend.onrender.com";

function App() {
  /* ---------------- INPUT STATES ---------------- */
  const [tlrInput, setTlrInput] = useState({
    fsr: 18,
    fqe: 0.75,
    fru: 0.8,
    tf: 70,
    fd: 60,
    si: 80,
  });

  const [rpcInput, setRpcInput] = useState({
    publications: 120,
    citations: 1400,
    patents: 8,
    sponsored: 200,
  });

  const [goInput, setGoInput] = useState({
    graduationRate: 78,
    placementRate: 65,
    higherStudies: 12,
  });

  /* ---------------- RESULT STATES ---------------- */
  const [tlrResult, setTlrResult] = useState(null);
  const [rpcResult, setRpcResult] = useState(null);
  const [goResult, setGoResult] = useState(null);
  const [totalResult, setTotalResult] = useState(null);

  const [loadingTLR, setLoadingTLR] = useState(false);
  const [loadingRPC, setLoadingRPC] = useState(false);
  const [loadingGO, setLoadingGO] = useState(false);
  const [loadingTotal, setLoadingTotal] = useState(false);

  /* ---------------- TLR API ---------------- */
  const calculateTLR = async () => {
    setLoadingTLR(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/nirf/tlr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tlrInput),
      });
      setTlrResult(await res.json());
    } finally {
      setLoadingTLR(false);
    }
  };

  /* ---------------- RPC API ---------------- */
  const calculateRPC = async () => {
    setLoadingRPC(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/nirf/rpc`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rpcInput),
      });
      setRpcResult(await res.json());
    } finally {
      setLoadingRPC(false);
    }
  };

  /* ---------------- GO API ---------------- */
  const calculateGO = async () => {
    setLoadingGO(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/nirf/go`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goInput),
      });
      setGoResult(await res.json());
    } finally {
      setLoadingGO(false);
    }
  };

  /* ---------------- TOTAL NIRF API ---------------- */
  const calculateTotalNIRF = async () => {
    setLoadingTotal(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/nirf/total`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tlr: tlrResult?.score || 0,
          rpc: rpcResult?.score || 0,
          go: goResult?.score || 0,
        }),
      });
      setTotalResult(await res.json());
    } finally {
      setLoadingTotal(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>📊 NIRF Calculator – Phase 3 (Data Input)</h1>
      <p>
        This tool demonstrates how institutional data contributes to NIRF
        scoring using officially aligned calculation logic.
      </p>

      {/* ================= TLR ================= */}
      <h2>TLR – Teaching, Learning & Resources</h2>

      <p><b>FSR:</b> Faculty to student ratio.</p>
      <input type="number" value={tlrInput.fsr}
        onChange={e => setTlrInput({ ...tlrInput, fsr: +e.target.value })} />

      <p><b>FQE:</b> Faculty qualification index.</p>
      <input type="number" step="0.01" value={tlrInput.fqe}
        onChange={e => setTlrInput({ ...tlrInput, fqe: +e.target.value })} />

      <p><b>FRU:</b> Faculty retention and utilization.</p>
      <input type="number" step="0.01" value={tlrInput.fru}
        onChange={e => setTlrInput({ ...tlrInput, fru: +e.target.value })} />

      <p><b>TF:</b> Financial resources for teaching (%).</p>
      <input type="number" value={tlrInput.tf}
        onChange={e => setTlrInput({ ...tlrInput, tf: +e.target.value })} />

      <p><b>FD:</b> Faculty development expenditure (%).</p>
      <input type="number" value={tlrInput.fd}
        onChange={e => setTlrInput({ ...tlrInput, fd: +e.target.value })} />

      <p><b>SI:</b> Student intake quality (%).</p>
      <input type="number" value={tlrInput.si}
        onChange={e => setTlrInput({ ...tlrInput, si: +e.target.value })} />

      <br /><br />
      <button onClick={calculateTLR}>
        {loadingTLR ? "Calculating..." : "Calculate TLR"}
      </button>

      {tlrResult && <p><b>TLR Score:</b> {tlrResult.score}</p>}

      <hr />

      {/* ================= RPC ================= */}
      <h2>RPC – Research & Professional Practice</h2>

      <p><b>Publications:</b> Research papers published.</p>
      <input type="number" value={rpcInput.publications}
        onChange={e => setRpcInput({ ...rpcInput, publications: +e.target.value })} />

      <p><b>Citations:</b> Total research citations.</p>
      <input type="number" value={rpcInput.citations}
        onChange={e => setRpcInput({ ...rpcInput, citations: +e.target.value })} />

      <p><b>Patents:</b> Filed or granted patents.</p>
      <input type="number" value={rpcInput.patents}
        onChange={e => setRpcInput({ ...rpcInput, patents: +e.target.value })} />

      <p><b>Sponsored Research:</b> Funding received (₹ Lakhs).</p>
      <input type="number" value={rpcInput.sponsored}
        onChange={e => setRpcInput({ ...rpcInput, sponsored: +e.target.value })} />

      <br /><br />
      <button onClick={calculateRPC}>
        {loadingRPC ? "Calculating..." : "Calculate RPC"}
      </button>

      {rpcResult && <p><b>RPC Score:</b> {rpcResult.score}</p>}

      <hr />

      {/* ================= GO ================= */}
      <h2>GO – Graduation Outcomes</h2>

      <p><b>Graduation Rate:</b> Students completing program (%).</p>
      <input type="number" value={goInput.graduationRate}
        onChange={e => setGoInput({ ...goInput, graduationRate: +e.target.value })} />

      <p><b>Placement Rate:</b> Students placed after graduation (%).</p>
      <input type="number" value={goInput.placementRate}
        onChange={e => setGoInput({ ...goInput, placementRate: +e.target.value })} />

      <p><b>Higher Studies:</b> Students opting for higher education (%).</p>
      <input type="number" value={goInput.higherStudies}
        onChange={e => setGoInput({ ...goInput, higherStudies: +e.target.value })} />

      <br /><br />
      <button onClick={calculateGO}>
        {loadingGO ? "Calculating..." : "Calculate GO"}
      </button>

      {goResult && <p><b>GO Score:</b> {goResult.score}</p>}

      <hr />

      {/* ================= TOTAL ================= */}
      <h2>🏆 Total NIRF Score</h2>
      <button onClick={calculateTotalNIRF}>
        {loadingTotal ? "Calculating..." : "Calculate Total NIRF"}
      </button>

      {totalResult && (
        <div>
          <p><b>Final Score:</b> {totalResult.totalScore}</p>
          <p><b>Included Parameters:</b> {totalResult.included.join(", ")}</p>
          <p style={{ fontSize: 13, color: "#555" }}>
            Note: Perception and Outreach parameters are handled separately as per official NIRF methodology.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
