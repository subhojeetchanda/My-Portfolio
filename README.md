# FORGED: Subhojeet Chanda Portfolio

A memorable, fast, accessible personal portfolio for Subhojeet Chanda.

## Getting Started

### Prerequisites
- Node.js 18+

### Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Testing
- **Unit Tests**: `npm run test` (Vitest)
- **Smoke Tests**: `npx playwright test` (Playwright)

### Build & Deploy
This project is built on Next.js 15 (App Router). To deploy to Vercel:
1. Push to a GitHub repository.
2. Import the project in Vercel.
3. Vercel will automatically detect Next.js and build it.
4. No specific environment variables are required out of the box, unless adding external analytics tracking IDs.

## Editing Content
All content is strictly separated from the UI logic.
Open `src/content/profile.ts` to modify:
- **About/Hero**: Name, headline, summary, email, phone.
- **Links**: LinkedIn, GitHub, Resume URL.
- **Experience**: The Furnace section timeline.
- **Projects**: The Rolling Mill section case studies.
- **Skills**: Raw Material skill groups.
- **Achievements**: Quality Lab test certificates.

### Control Room Attributes (Scoring)
Projects are dynamically ranked in the Control Room. In `profile.ts`, each project has an `attributes` object with values from 0-10:
```ts
attributes: {
  ml: 8,       // Machine Learning depth
  engineering: 9, // Engineering complexity
  research: 5,    // Research & papers
  impact: 8,      // Real-world impact
  scale: 7        // Scale of deployment
}
```
Adjusting these values will automatically change how the project ranks when a recruiter moves the sliders in the Control Room. The math is a simple weighted average.
