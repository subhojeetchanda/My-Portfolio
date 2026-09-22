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

export type CommitRecord = {
  message: string;
  repo: string;
  date: string;
};

export async function fetchLatestCommits(): Promise<CommitRecord[]> {
  try {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return getMockCommits();

    const username = "subhojeetchanda"; // or get from profile
    
    // Using REST API for events
    const res = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 3600 }
    });

    if (!res.ok) return getMockCommits();

    const events = await res.json();
    const pushEvents = events.filter((e: any) => e.type === 'PushEvent');
    
    const commits: CommitRecord[] = [];
    
    for (const event of pushEvents) {
      const repoName = event.repo.name.split('/')[1] || event.repo.name;
      for (const commit of event.payload.commits) {
        if (!commit.message.includes('Merge pull request') && !commit.message.includes('Merge branch')) {
          commits.push({
            message: commit.message.split('\n')[0], // Get first line
            repo: repoName,
            date: formatRelativeTime(new Date(event.created_at)),
          });
        }
        if (commits.length >= 8) return commits;
      }
    }
    
    if (commits.length === 0) return getMockCommits();
    return commits;
  } catch (err) {
    return getMockCommits();
  }
}

function formatRelativeTime(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const daysDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  if (daysDifference === 0) {
      const hoursDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60 * 60));
      if (hoursDifference === 0) {
          const minutesDifference = Math.round((date.getTime() - new Date().getTime()) / (1000 * 60));
          return rtf.format(minutesDifference, 'minute');
      }
      return rtf.format(hoursDifference, 'hour');
  }
  return rtf.format(daysDifference, 'day');
}

function getMockCommits(): CommitRecord[] {
  return [
    { message: "fix: resolve hydration mismatch in telemetry strip", repo: "my-portfolio", date: "2 hours ago" },
    { message: "feat: add regression tests for metrics", repo: "my-portfolio", date: "4 hours ago" },
    { message: "Update documentation", repo: "sail-analytics", date: "1 day ago" },
    { message: "refactor: replace useSpring with animate()", repo: "my-portfolio", date: "2 days ago" },
    { message: "Initial commit", repo: "carelink-ai", date: "1 week ago" }
  ];
}
