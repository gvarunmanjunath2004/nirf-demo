import { useState } from "react";

const BACKEND_URL = "https://nirf-backend.onrender.com";

function App() {
  /* ================= INPUT STATES ================= */

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

  const [oiInput, setOiInput] = useState({
    womenRatio: 42,
    ewsRatio: 38,
    outsideStateRatio: 25,
  });

  const [prInput, setPrInput] = useState({
    academicPeers: 75,
    employers: 68,
    publicPerception: 72,
  });

  /* ================= RESULT STATES ================= */

  const [tlrResult, setTlrResult] = useState(null);
  const [rpcResult, setRpcResult] = useState(null);
  const [goResult, setGoResult] = useState(null);
  const [oiResult, setOiResult] = useState(null);
  const [prResult, setPrResult] = useState(null);
  const [totalResult, setTotalResult] = useState(null);

  const [loadingTLR, setLoadingTLR] = useState(false);
  const [loadingRPC, setLoadingRPC] = useState(false);
  const [loadingGO, setLoadingGO] = useState(false);
  const [loadingOI, setLoadingOI] = useState(false);
  const [loadingPR, setLoadingPR] = useState(false);
  const [loadingTotal, setLoadingTotal] = useState(false);

  /* ================= API CALLS ================= */

  const calculateTLR = async () => {
    setLoadingTLR(true);
    const res = await fetch(`${BACKEND_URL}/api/nirf/tlr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tlrInput),
    });
    setTlrResult(await res.json());
    setLoadingTLR(false);
  };

  const calculateRPC = async () => {
    setLoadingRPC(true);
    const res = await fetch(`${BACKEND_URL}/api/nirf/rpc`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rpcInput),
    });
    setRpcResult(await res.json());
    setLoadingRPC(false);
  };

  const calculateGO = async () => {
    setLoadingGO(true);
    const res = await fetch(`${BACKEND_URL}/api/nirf/go`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(goInput),
    });
    setGoResult(await res.json());
    setLoadingGO(false);
  };

  const calculateOI = async () => {
    setLoadingOI(true);
    const res = await fetch(`${BACKEND_URL}/api/nirf/oi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(oiInput),
    });
    setOiResult(await res.json());
    setLoadingOI(false);
  };

  const calculatePR = async () => {
    setLoadingPR(true);
    const res = await fetch(`${BACKEND_URL}/api/nirf/pr`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prInput),
    });
    setPrResult(await res.json());
    setLoadingPR(false);
  };

  const calculateTotalNIRF = async () => {
    setLoadingTotal(true);
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
    setLoadingTotal(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>📊 NIRF Ranking Calculator – Complete Demo</h1>
      <p>
        This application demonstrates how colleges can evaluate their
        performance against NIRF parameters using institutional data.
      </p>

      {/* ================= TLR ================= */}
      <h2>TLR – Teaching, Learning & Resources</h2>
      <p><b>FSR (Faculty–Student Ratio):</b> Number of faculty members available per student.</p>
      <input value={tlrInput.fsr} onChange={e => setTlrInput({ ...tlrInput, fsr: +e.target.value })} />
      <p><b>FQE (Faculty Qualification & Experience):</b> Academic qualifications and experience of faculty.</p>
      <input value={tlrInput.fqe} onChange={e => setTlrInput({ ...tlrInput, fqe: +e.target.value })} />
      <p><b>FRU (Faculty Retention & Utilization):</b> Stability and effective utilization of faculty.</p>
      <input value={tlrInput.fru} onChange={e => setTlrInput({ ...tlrInput, fru: +e.target.value })} />
      <p><b>TF (Teaching Financial Resources):</b> Financial resources allocated for teaching activities (%).</p>
      <input value={tlrInput.tf} onChange={e => setTlrInput({ ...tlrInput, tf: +e.target.value })} />
      <p><b>FD (Faculty Development):</b> Expenditure on faculty training and development (%).</p>
      <input value={tlrInput.fd} onChange={e => setTlrInput({ ...tlrInput, fd: +e.target.value })} />
      <p><b>SI (Student Intake Quality):</b> Quality of students admitted based on merit (%).</p>
      <input value={tlrInput.si} onChange={e => setTlrInput({ ...tlrInput, si: +e.target.value })} />
      <br />
      <button onClick={calculateTLR}>Calculate TLR</button>
      {tlrResult && <p>TLR Score: {tlrResult.score}</p>}

      <hr />

      {/* ================= RPC ================= */}
      <h2>RPC – Research & Professional Practice</h2>
      <p><b>Publications:</b> Total number of research papers published.</p>
      <input value={rpcInput.publications} onChange={e => setRpcInput({ ...rpcInput, publications: +e.target.value })} />
      <p><b>Citations:</b> Total citations received by published research.</p>
      <input value={rpcInput.citations} onChange={e => setRpcInput({ ...rpcInput, citations: +e.target.value })} />
      <p><b>Patents:</b> Number of patents filed or granted.</p>
      <input value={rpcInput.patents} onChange={e => setRpcInput({ ...rpcInput, patents: +e.target.value })} />
      <p><b>Sponsored Research:</b> Research funding received from government/industry (₹ Lakhs).</p>
      <input value={rpcInput.sponsored} onChange={e => setRpcInput({ ...rpcInput, sponsored: +e.target.value })} />
      <br />
      <button onClick={calculateRPC}>Calculate RPC</button>
      {rpcResult && <p>RPC Score: {rpcResult.score}</p>}

      <hr />

      {/* ================= GO ================= */}
      <h2>GO – Graduation Outcomes</h2>
      <p><b>Graduation Rate:</b> Percentage of students who successfully completed the program.</p>
      <input value={goInput.graduationRate} onChange={e => setGoInput({ ...goInput, graduationRate: +e.target.value })} />
      <p><b>Graduation Rate:</b> Percentage of students who successfully completed the program.</p>
      <input value={goInput.placementRate} onChange={e => setGoInput({ ...goInput, placementRate: +e.target.value })} />
      <p><b>Higher Studies:</b> Percentage of students opting for higher education.</p>
      <input value={goInput.higherStudies} onChange={e => setGoInput({ ...goInput, higherStudies: +e.target.value })} />
      <br />
      <button onClick={calculateGO}>Calculate GO</button>
      {goResult && <p>GO Score: {goResult.score}</p>}

      <hr />

      {/* ================= OI ================= */}
      <h2>OI – Outreach & Inclusivity</h2>
      <p><b>Women Ratio:</b> Percentage of female students enrolled.</p>
      <input value={oiInput.womenRatio} onChange={e => setOiInput({ ...oiInput, womenRatio: +e.target.value })} />
      <p><b>Social Inclusion Ratio:</b> Percentage of students from EWS / SC / ST / OBC categories.</p>
      <input value={oiInput.ewsRatio} onChange={e => setOiInput({ ...oiInput, ewsRatio: +e.target.value })} />
      <p><b>Regional Diversity:</b> Percentage of students from outside the home state.</p>
      <input value={oiInput.outsideStateRatio} onChange={e => setOiInput({ ...oiInput, outsideStateRatio: +e.target.value })} />
      <br />
      <button onClick={calculateOI}>Calculate OI</button>
      {oiResult && <p>OI Score: {oiResult.score}</p>}

      <hr />

      {/* ================= PR ================= */}
      <h2>PR – Perception</h2>
      <p><b>Academic Peer Perception:</b> Reputation score from academic peers.</p>
      <input value={prInput.academicPeers} onChange={e => setPrInput({ ...prInput, academicPeers: +e.target.value })} />
      <p><b>Employer Perception:</b> Reputation score from recruiters and employers.</p>
      <input value={prInput.employers} onChange={e => setPrInput({ ...prInput, employers: +e.target.value })} />
      <p><b>Public Perception:</b> General public and stakeholder perception score.</p>
      <input value={prInput.publicPerception} onChange={e => setPrInput({ ...prInput, publicPerception: +e.target.value })} />
      <br />
      <button onClick={calculatePR}>Calculate PR</button>
      {prResult && <p>PR Score: {prResult.score}</p>}

      <hr />

      {/* ================= TOTAL ================= */}
      <h2>🏆 Final NIRF Score</h2>
      <button onClick={calculateTotalNIRF}>Calculate Total NIRF</button>

      {totalResult && (
        <div>
          <p><b>Final Score:</b> {totalResult.totalScore}</p>
          <p><b>Included Parameters:</b> {totalResult.included.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
