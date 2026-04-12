/**
 * Calculate quiz result based on answers
 * @param {Array} questions - Quiz questions array
 * @param {Object} answers - { questionId: optionId }
 * @param {Object} scoring - Scoring config from quiz
 * @returns {{ winner: string, scores: Object, breakdown: Object }}
 */
export function calculateResult(questions, answers, scoring) {
  const totals = {};
  scoring.categories.forEach((cat) => {
    totals[cat] = 0;
  });

  // Sum up scores from all answers
  Object.entries(answers).forEach(([questionId, optionId]) => {
    const question = questions.find((q) => q.id === questionId);
    if (!question) return;
    const option = question.options.find((o) => o.id === optionId);
    if (!option) return;

    Object.entries(option.scores).forEach(([cat, score]) => {
      if (totals[cat] !== undefined) {
        totals[cat] += score;
      }
    });
  });

  // Sort categories by score descending
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  // Handle tiebreaker using last questions
  let winner = sorted[0][0];
  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) {
    // Tie — use last 2 questions as tiebreaker
    const lastQuestions = questions.slice(-2);
    const tieTotals = {};
    scoring.categories.forEach((cat) => {
      tieTotals[cat] = 0;
    });

    lastQuestions.forEach((q) => {
      const optionId = answers[q.id];
      if (!optionId) return;
      const option = q.options.find((o) => o.id === optionId);
      if (!option) return;
      Object.entries(option.scores).forEach(([cat, score]) => {
        if (tieTotals[cat] !== undefined) {
          tieTotals[cat] += score;
        }
      });
    });

    const tieSorted = Object.entries(tieTotals).sort((a, b) => b[1] - a[1]);
    winner = tieSorted[0][0];
  }

  // Calculate breakdown percentages
  const totalScore = Object.values(totals).reduce((a, b) => a + b, 0);
  const breakdown = {};
  Object.entries(totals).forEach(([cat, score]) => {
    breakdown[cat] = totalScore > 0 ? Math.round((score / totalScore) * 100) : 0;
  });

  return { winner, scores: totals, breakdown };
}
