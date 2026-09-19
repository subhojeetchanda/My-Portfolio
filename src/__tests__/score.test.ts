import { expect, test, describe } from 'vitest';
import { scoreProject, rankProjects, Weights } from '@/lib/score';
import { Project } from '@/content/profile';

// Mock projects for testing
const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Project 1',
    stack: [],
    links: { github: 'TODO', live: 'TODO' },
    bulletPoints: [],
    attributes: { ml: 0.9, fullStack: 0.2, realTime: 0.1, impact: 0.8, research: 0.5 },
  },
  {
    id: 'p2',
    title: 'Project 2',
    stack: [],
    links: { github: 'TODO', live: 'TODO' },
    bulletPoints: [],
    attributes: { ml: 0.1, fullStack: 0.9, realTime: 0.8, impact: 0.7, research: 0.1 },
  },
  {
    id: 'p3',
    title: 'Project 3 (Tie with P1 on ML)',
    stack: [],
    links: { github: 'TODO', live: 'TODO' },
    bulletPoints: [],
    attributes: { ml: 0.9, fullStack: 0.2, realTime: 0.1, impact: 0.8, research: 0.5 },
  },
];

describe('Scoring Logic', () => {
  test('all-zero weights -> returns original order and score 0', () => {
    const weights: Weights = { ml: 0, fullStack: 0, realTime: 0, impact: 0, research: 0 };
    const ranked = rankProjects(mockProjects, weights);
    
    expect(ranked[0].project.id).toBe('p1');
    expect(ranked[1].project.id).toBe('p2');
    expect(ranked[2].project.id).toBe('p3');
    expect(ranked[0].totalScore).toBe(0);
  });

  test('single non-zero weight ranks correctly', () => {
    const weights: Weights = { ml: 0, fullStack: 10, realTime: 0, impact: 0, research: 0 };
    const ranked = rankProjects(mockProjects, weights);
    
    // P2 has highest fullStack (0.9), so it should be first
    expect(ranked[0].project.id).toBe('p2');
    expect(ranked[0].totalScore).toBe(0.9);
    expect(ranked[1].project.id).toBe('p1');
    expect(ranked[1].totalScore).toBe(0.2);
  });

  test('ties keep original order (stable sort)', () => {
    const weights: Weights = { ml: 10, fullStack: 0, realTime: 0, impact: 0, research: 0 };
    const ranked = rankProjects(mockProjects, weights);
    
    // P1 and P3 have identical attributes and both score 0.9 on ML.
    // Original order is p1, p2, p3. 
    // Ranked should be p1, p3, p2.
    expect(ranked[0].project.id).toBe('p1');
    expect(ranked[1].project.id).toBe('p3');
    expect(ranked[2].project.id).toBe('p2');
  });

  test('scale invariance: multiplying weights by k does not change ranking or final percentage score', () => {
    const w1: Weights = { ml: 2, fullStack: 4, realTime: 1, impact: 5, research: 0 };
    const w2: Weights = { ml: 20, fullStack: 40, realTime: 10, impact: 50, research: 0 };
    
    const r1 = rankProjects(mockProjects, w1);
    const r2 = rankProjects(mockProjects, w2);
    
    expect(r1.map(r => r.project.id)).toEqual(r2.map(r => r.project.id));
    
    // Total score is sum(w*attr)/sum(w), so it should be identical
    expect(r1[0].totalScore).toBeCloseTo(r2[0].totalScore);
    expect(r1[1].totalScore).toBeCloseTo(r2[1].totalScore);
  });

  test('attribute bounds are clamped to [0,1]', () => {
    const outOfBoundsProject: Project = {
      ...mockProjects[0],
      attributes: { ml: 1.5, fullStack: -0.5, realTime: 0, impact: 0, research: 0 }
    };
    const weights: Weights = { ml: 1, fullStack: 1, realTime: 0, impact: 0, research: 0 };
    
    const res = scoreProject(outOfBoundsProject, weights, 0);
    // ml=1.5 clamped to 1.0, fullStack=-0.5 clamped to 0.0
    // totalScore = (1.0 * 1 + 0.0 * 1) / 2 = 0.5
    expect(res.totalScore).toBe(0.5);
  });
});
