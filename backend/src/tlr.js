function calculateTLR(data) {
  const { fsr, fqe, fru, tf, fd, si } = data;

  if (fsr == null) {
    throw new Error("FSR is required");
  }

  const scores = {
    fsr: Math.min(fsr / 20, 1) * 20,
    fqe: Math.min(fqe || 0, 1) * 25,
    fru: Math.min(fru || 0, 1) * 10,
    tf: Math.min((tf || 0) / 100, 1) * 10,
    fd: Math.min((fd || 0) / 100, 1) * 10,
    si: Math.min((si || 0) / 100, 1) * 25,
  };

  const score =
    scores.fsr +
    scores.fqe +
    scores.fru +
    scores.tf +
    scores.fd +
    scores.si;

  return {
    score: Number(score.toFixed(1)),
    components: scores,
  };
}

module.exports = { calculateTLR };
