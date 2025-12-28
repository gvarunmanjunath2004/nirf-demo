import { useState } from "react";

const BACKEND_URL = "https://nirf-backend.onrender.com";

function App() {
  /* =====================================================
     INPUT STATES
     These values represent institutional data entered
     manually for NIRF score calculation (Phase 3)
     ===================================================== */

  // TLR – Teaching, Learning & Resources
  const [tlrInput, setTlrInput] = useState({
    fsr: 18,     // Faculty–Student Ratio
    fqe: 0.75,   // Faculty Qualification Index
    fru: 0.8,    // Faculty Retention & Utilization
    tf: 70,      // Teaching financial resources (%)
    fd: 60,      // Faculty development expenditure (%)
    si: 80,      // Student intake quality (%)
  });

  // RPC – Research & Professional Practice
  const [rpcInput, setRpcInput] = useState({
    publications: 120, // Research publications
    citations: 1400,   // Total citations
    patents: 8,        // Filed / granted patents
    sponsored: 200,    // Sponsored research funding (₹ Lakhs)
  });

  // GO – Graduation Outcomes
  const [goInput, setGoInput] = useState({
    graduationRate: 78, // Students completing program (%)
    placementRate: 65,  // Students placed (%)
    higherStudies: 12,  // Students opting higher education (%)
  });

  // OI – Outreach & Inclusivity
  const [oiInput, setOiInput] = useState({
    womenRatio: 42,            // Women students (%)
    socialCategoryRatio: 38,   // SC/ST/OBC/EWS (%)
    outsideStateRatio: 25,     // Students from other states (%)
  });

  // PR – Perception (Indicative / Survey-based)
  const [prInput, setPrInput] = useState({
    academicPeers: 75,     // Academic peer perception score
    employers: 68,         // Employer perception score
    publicPerception: 72, // Public perception score
  });

  /* =====================================================
     RESULT STATES
     Stores scores returned from backend
     ===================================================== */

  const [tlrResult, setTlrResult] = useState(null);
  const [rpcResult, setRpcResult] = useState(null);
  const [goResult, setGoResult] = useState(null);
  const [oiResult, setOiResult] = useState(null);
  const [prResult, setPrResult] = useState(null);
  const [totalResult, setTotalResult] = useState(null);

  /* =====================================================
     API CALL FUNCTIONS
     Each function sends input data to backend and
     receives calculated score
     ===================================================== */

  const calculateTLR = async () => {
    const res = await fetch(`${BACKEND_URL}/api/nirf/tlr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tlrInput),
    });
    setTlrResult(await res.json());
  };

  const calculateRPC = async () => {
    const res = await fetch(`${BACKEND_URL}/api/nirf/rpc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rpcInput),
    });
    setRpcResult(await res.json());
  };

  const calculateGO = async () => {
    const res = await fetch(`${BACKEND_URL}/api/nirf/go`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goInput),
    });
    setGoResult(await res.json());
  };

  const calculateOI = async () => {
    const res = await fetch(`${BACKEND_URL}/api/nirf/oi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oiInput),
    });
    setOiResult(await res.json());
  };

  const calculatePR = async () => {
    const res = await fetch(`${BACKEND_URL}/api/nirf/pr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prInput),
    });
    setPrResult(await res.json());
  };

  // TOTAL NIRF SCORE (Combined pillars)
  const calculateTotalNIRF = async () => {
    const res = await fetch(`${BACKEND_URL}/api/nirf/total`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tlr: tlrResult?.score || 0,
        rpc: rpcResult?.score || 0,
        go: goResult?.score || 0,
        oi: oiResult?.score || 0,
        pr: prResult?.score || 0,
      }),
    });
    setTotalResult(await res.json());
  };

  /* =====================================================
     UI SECTION
     ===================================================== */

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>📊 NIRF Ranking Calculator – Final Demo</h1>
      <p>
        This application demonstrates how institutional data contributes
        to National Institutional Ranking Framework (NIRF) scores.
      </p>

      {/* ================= TLR ================= */}
      <h2>TLR – Teaching, Learning & Resources</h2>
      <p>Measures faculty strength, quality, and teaching resources.</p>
      <input type="number" value={tlrInput.fsr}
        onChange={e => setTlrInput({ ...tlrInput, fsr: +e.target.value })} />
      <button onClick={calculateTLR}>Calculate TLR</button>
      {tlrResult && <p><b>TLR Score:</b> {tlrResult.score}</p>}

      <hr />

      {/* ================= RPC ================= */}
      <h2>RPC – Research & Professional Practice</h2>
      <p>Measures research output, impact, patents, and funding.</p>
      <input type="number" value={rpcInput.publications}
        onChange={e => setRpcInput({ ...rpcInput, publications: +e.target.value })} />
      <button onClick={calculateRPC}>Calculate RPC</button>
      {rpcResult && <p><b>RPC Score:</b> {rpcResult.score}</p>}

      <hr />

      {/* ================= GO ================= */}
      <h2>GO – Graduation Outcomes</h2>
      <p>Measures student success through graduation, placement, and higher studies.</p>
      <input type="number" value={goInput.graduationRate}
        onChange={e => setGoInput({ ...goInput, graduationRate: +e.target.value })} />
      <button onClick={calculateGO}>Calculate GO</button>
      {goResult && <p><b>GO Score:</b> {goResult.score}</p>}

      <hr />

      {/* ================= OI ================= */}
      <h2>OI – Outreach & Inclusivity</h2>
      <p>Measures gender diversity, social inclusion, and geographic outreach.</p>
      <input type="number" value={oiInput.womenRatio}
        onChange={e => setOiInput({ ...oiInput, womenRatio: +e.target.value })} />
      <button onClick={calculateOI}>Calculate OI</button>
      {oiResult && <p><b>OI Score:</b> {oiResult.score}</p>}

      <hr />

      {/* ================= PR ================= */}
      <h2>PR – Perception</h2>
      <p>
        Represents perception from academic peers, employers, and the public.
        In real NIRF, this is survey-based.
      </p>
      <input type="number" value={prInput.academicPeers}
        onChange={e => setPrInput({ ...prInput, academicPeers: +e.target.value })} />
      <button onClick={calculatePR}>Submit PR</button>
      {prResult && <p style={{ fontSize: 13 }}>{prResult.note || prResult.explanation}</p>}

      <hr />

      {/* ================= TOTAL ================= */}
      <h2>🏆 Total NIRF Score</h2>
      <p>
        Final score calculated by combining all NIRF parameters
        using defined weightage logic.
      </p>
      <button onClick={calculateTotalNIRF}>Calculate Total NIRF</button>

      {totalResult && (
        <div>
          <p><b>Final NIRF Score:</b> {totalResult.totalScore}</p>
          <p><b>Included Parameters:</b> {totalResult.included.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
