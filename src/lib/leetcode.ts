export type LeetcodeStats = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  timestamp: string;
  isSnapshot: boolean;
};

export async function getLeetcodeStats(username: string): Promise<LeetcodeStats> {
  const query = `
    query userSessionProgress($username: String!) {
      matchedUser(username: $username) {
        submitStats {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
    }
  `;
  
  try {
    // We use a custom fetch with timeout because this unofficial endpoint can be flaky
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Leetcode API responded with ${res.status}`);
    }

    const json = await res.json();
    if (json.errors || !json.data?.matchedUser) {
      throw new Error("Leetcode GraphQL errors or user not found");
    }

    const stats = json.data.matchedUser.submitStats.acSubmissionNum;
    const findCount = (diff: string) => stats.find((s: any) => s.difficulty === diff)?.count || 0;

    return {
      totalSolved: findCount("All"),
      easySolved: findCount("Easy"),
      mediumSolved: findCount("Medium"),
      hardSolved: findCount("Hard"),
      timestamp: new Date().toISOString(),
      isSnapshot: false,
    };
  } catch (err) {
    console.error("Error fetching Leetcode stats:", err);
    return getLeetcodeSnapshot();
  }
}

async function getLeetcodeSnapshot(): Promise<LeetcodeStats> {
  try {
    const snapshot = await import('@/content/snapshots/leetcode.json');
    return {
      ...snapshot.default,
      isSnapshot: true
    } as LeetcodeStats;
  } catch (err) {
    return {
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0,
      timestamp: new Date().toISOString(),
      isSnapshot: true,
    };
  }
}
