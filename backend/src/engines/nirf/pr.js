/**
 * PR – Perception
 * Real NIRF PR is based on national surveys.
 * This implementation is a simulated placeholder for demo & planning.
 */

function calculatePR(data) {
  const { perceptionScore = 0 } = data;

  const score = Math.min(perceptionScore, 10);

  return {
    score: Number(score.toFixed(1)), // out of 10
    explanation: "Indicative perception score (manual input)",
    note: "Actual NIRF PR is based on external perception surveys"
  };
}

module.exports = { calculatePR };
