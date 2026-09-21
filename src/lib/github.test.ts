import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getGithubStats } from './github';

const mockResponse = {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: 500,
          weeks: [
            { contributionDays: [{ contributionCount: 5, date: '2024-01-01' }] }
          ]
        }
      },
      repositories: {
        nodes: [
          {
            languages: {
              edges: [
                { size: 1000, node: { name: 'TypeScript' } },
                { size: 500, node: { name: 'Python' } }
              ]
            }
          },
          {
            languages: {
              edges: [
                { size: 2000, node: { name: 'TypeScript' } }
              ]
            }
          }
        ]
      }
    }
  }
};

describe('getGithubStats', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
    vi.stubEnv('GITHUB_TOKEN', 'fake_token');
  });

  it('transforms valid GraphQL response correctly', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const stats = await getGithubStats('testuser');

    expect(stats.isSnapshot).toBe(false);
    expect(stats.totalContributions).toBe(500);
    expect(stats.languageBytes['TypeScript']).toBe(3000); // 1000 + 2000
    expect(stats.languageBytes['Python']).toBe(500);
  });

  it('falls back to snapshot on fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const stats = await getGithubStats('testuser');

    expect(stats.isSnapshot).toBe(true);
    // Based on our mock snapshot data
    expect(stats.totalContributions).toBeGreaterThan(0);
  });

  it('falls back to snapshot if no GITHUB_TOKEN', async () => {
    vi.stubEnv('GITHUB_TOKEN', '');

    const stats = await getGithubStats('testuser');

    expect(stats.isSnapshot).toBe(true);
  });
});
