function calculateGO(data) {
  const {
    graduationRate = 0,
    placementRate = 0,
    higherStudies = 0
  } = data;

  const scores = {
    graduationRate: Math.min(graduationRate / 100, 1) * 15,
    placementRate: Math.min(placementRate / 100, 1) * 10,
    higherStudies: Math.min(higherStudies / 100, 1) * 5
  };

  const score =
    scores.graduationRate +
    scores.placementRate +
    scores.higherStudies;

  return {
    score: Number(score.toFixed(1)),
    components: scores
  };
}

module.exports = { calculateGO };
