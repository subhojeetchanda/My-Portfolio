import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getLeetcodeStats } from './leetcode';

const mockResponse = {
  data: {
    matchedUser: {
      submitStats: {
        acSubmissionNum: [
          { difficulty: 'All', count: 100 },
          { difficulty: 'Easy', count: 50 },
          { difficulty: 'Medium', count: 40 },
          { difficulty: 'Hard', count: 10 }
        ]
      }
    }
  }
};

describe('getLeetcodeStats', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('transforms valid GraphQL response correctly', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const stats = await getLeetcodeStats('testuser');

    expect(stats.isSnapshot).toBe(false);
    expect(stats.totalSolved).toBe(100);
    expect(stats.easySolved).toBe(50);
    expect(stats.mediumSolved).toBe(40);
    expect(stats.hardSolved).toBe(10);
  });

  it('falls back to snapshot on fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const stats = await getLeetcodeStats('testuser');

    expect(stats.isSnapshot).toBe(true);
    // Based on our mock snapshot data
    expect(stats.totalSolved).toBeGreaterThan(0);
  });
});
