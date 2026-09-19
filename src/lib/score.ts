import { Project } from '@/content/profile';

export type Weights = {
  ml: number;
  fullStack: number;
  realTime: number;
  impact: number;
  research: number;
};

export type AxisContribution = {
  axis: keyof Weights;
  contribution: number; // weight_i * attribute_i
  maxContribution: number; // weight_i * 1.0
};

export type ScoreResult = {
  project: Project;
  totalScore: number;
  contributions: AxisContribution[];
  originalIndex: number;
};

export function scoreProject(project: Project, weights: Weights, originalIndex: number): ScoreResult {
  const axes: (keyof Weights)[] = ['ml', 'fullStack', 'realTime', 'impact', 'research'];
  let numerator = 0;
  let denominator = 0;
  const contributions: AxisContribution[] = [];

  for (const axis of axes) {
    const w = weights[axis];
    // Ensure attribute is bound to [0, 1]
    const attr = Math.max(0, Math.min(1, project.attributes[axis]));
    
    const contrib = w * attr;
    numerator += contrib;
    denominator += w;

    contributions.push({
      axis,
      contribution: contrib,
      maxContribution: w
    });
  }

  // If all weights are 0, score is 0. 
  const totalScore = denominator === 0 ? 0 : numerator / denominator;

  return {
    project,
    totalScore,
    contributions,
    originalIndex
  };
}

export function rankProjects(projects: Project[], weights: Weights): ScoreResult[] {
  const sumWeights = Object.values(weights).reduce((a, b) => a + b, 0);
  
  const scored = projects.map((p, i) => scoreProject(p, weights, i));

  // All weights 0 -> default resume order
  if (sumWeights === 0) {
    return scored; // Keep original order
  }

  // Sort descending by score. Tie-break with originalIndex for stable sorting.
  return scored.sort((a, b) => {
    // We use a small epsilon for floating point comparison to ensure ties are properly detected
    const diff = b.totalScore - a.totalScore;
    if (Math.abs(diff) < 1e-9) {
      return a.originalIndex - b.originalIndex;
    }
    return diff;
  });
}
