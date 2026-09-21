const fs = require('fs');

const data = {
  totalContributions: 1250,
  weeks: [],
  languageBytes: {
    TypeScript: 150000,
    Python: 85000,
    JavaScript: 45000,
    HTML: 12000,
    CSS: 8000
  },
  timestamp: new Date().toISOString(),
  isSnapshot: true
};

// Generate 52 weeks of mock data
const today = new Date();
for (let i = 52; i >= 0; i--) {
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - (i * 7));
  
  const days = [];
  for (let j = 0; j < 7; j++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + j);
    
    // some random but somewhat realistic contribution pattern
    let count = 0;
    if (Math.random() > 0.4) {
      count = Math.floor(Math.random() * 8);
    }
    
    days.push({
      contributionCount: count,
      date: day.toISOString().split('T')[0]
    });
  }
  data.weeks.push({ contributionDays: days });
}

data.totalContributions = data.weeks.reduce((acc, w) => acc + w.contributionDays.reduce((a, d) => a + d.contributionCount, 0), 0);

fs.writeFileSync('./src/content/snapshots/github.json', JSON.stringify(data, null, 2));
console.log("Updated github.json with 53 weeks of mock data.");
