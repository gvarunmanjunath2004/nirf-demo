/**
 * OI – Outreach & Inclusivity (Simulated / Self-declared)
 *
 * This score represents how inclusive and diverse an institution is.
 * Values are provided by the institution and normalized as per NIRF-style logic.
 *
 * NOTE:
 * Actual NIRF OI is verified using submitted data and government records.
 * This implementation is an indicative / demo-level calculation.
 */
function calculateOI(data) {
  const {
    womenRatio = 0,            // % of women students/faculty
    socialCategoryRatio = 0,   // % of SC / ST / OBC / EWS students
    outsideStateRatio = 0      // % of students from other states / regions
  } = data;

  const scores = {
    // Gender diversity (max 4)
    women: Math.min(womenRatio / 50, 1) * 4,

    // Social inclusion (max 3)
    inclusion: Math.min(socialCategoryRatio / 50, 1) * 3,

    // Geographic diversity (max 3)
    outreach: Math.min(outsideStateRatio / 30, 1) * 3
  };

  const score =
    scores.women +
    scores.inclusion +
    scores.outreach;

  return {
    score: Number(score.toFixed(1)), // out of 10
    components: scores,
    note: "Simulated OI score based on self-declared institutional data"
  };
}

module.exports = { calculateOI };
