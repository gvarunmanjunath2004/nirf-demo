function calculateTotalNIRF({ tlr, rpc, go }) {
  if (
    typeof tlr !== "number" ||
    typeof rpc !== "number" ||
    typeof go !== "number"
  ) {
    throw new Error("TLR, RPC, and GO must be numbers");
  }

  const rawScore = tlr + rpc + go; // out of 80
  const totalScore = (rawScore / 80) * 100;

  return {
    rawScore: Number(rawScore.toFixed(1)),     // out of 80
    totalScore: Number(totalScore.toFixed(1)), // out of 100
    included: ["TLR", "RPC", "GO"],
    pending: ["OI", "PR"],
  };
}

module.exports = { calculateTotalNIRF };
