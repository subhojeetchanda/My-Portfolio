export type GithubContributionWeek = {
  contributionDays: {
    contributionCount: number;
    date: string;
  }[];
};

export type GithubStats = {
  totalContributions: number;
  weeks: GithubContributionWeek[];
  languageBytes: Record<string, number>;
  timestamp: string;
  isSnapshot: boolean;
};

// We will fetch from GitHub GraphQL API
export async function getGithubStats(username: string): Promise<GithubStats> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    console.warn("GITHUB_TOKEN is not set. Falling back to snapshot.");
    return getGithubSnapshot();
  }

  try {
    const query = `
      query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
          repositories(first: 100, isFork: false, ownerAffiliations: OWNER) {
            nodes {
              languages(first: 10) {
                edges {
                  size
                  node {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with ${res.status}`);
    }

    const json = await res.json();
    if (json.errors) {
      throw new Error("GitHub GraphQL errors: " + JSON.stringify(json.errors));
    }

    const data = json.data.user;
    
    // Process languages
    const languageBytes: Record<string, number> = {};
    for (const repo of data.repositories.nodes) {
      for (const langEdge of repo.languages.edges) {
        const langName = langEdge.node.name;
        const size = langEdge.size;
        languageBytes[langName] = (languageBytes[langName] || 0) + size;
      }
    }

    return {
      totalContributions: data.contributionsCollection.contributionCalendar.totalContributions,
      weeks: data.contributionsCollection.contributionCalendar.weeks,
      languageBytes,
      timestamp: new Date().toISOString(),
      isSnapshot: false,
    };
  } catch (err) {
    console.error("Error fetching GitHub stats:", err);
    return getGithubSnapshot();
  }
}

async function getGithubSnapshot(): Promise<GithubStats> {
  try {
    const snapshot = await import('@/content/snapshots/github.json');
    return {
      ...snapshot.default,
      isSnapshot: true
    } as GithubStats;
  } catch (err) {
    // If even the snapshot fails, return an empty mock
    return {
      totalContributions: 0,
      weeks: [],
      languageBytes: { "Error": 1 },
      timestamp: new Date().toISOString(),
      isSnapshot: true,
    };
  }
}
