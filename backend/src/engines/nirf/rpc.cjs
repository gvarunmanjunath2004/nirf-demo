function calculateRPC(data) {
  const {
    publications = 0,
    citations = 0,
    patents = 0,
    sponsored = 0
  } = data;

  const scores = {
    publications: Math.min(publications / 200, 1) * 10,
    citations: Math.min(citations / 2000, 1) * 10,
    patents: Math.min(patents / 20, 1) * 5,
    sponsored: Math.min(sponsored / 500, 1) * 5
  };

  const score =
    scores.publications +
    scores.citations +
    scores.patents +
    scores.sponsored;

  return {
    score: Number(score.toFixed(1)),
    components: scores
  };
}

module.exports = { calculateRPC };
