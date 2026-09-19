# PROJECT: "FORGED", portfolio of Subhojeet Chanda

## Goal
A memorable, fast, accessible personal portfolio. A recruiter must find projects and contact info within 10 seconds and still remember the site a week later. Uniqueness comes from the concept and ONE signature interaction, not heavy effects. If a choice is between "cooler" and "faster/clearer", choose faster/clearer.

## Concept
Narrative: "Visitors follow raw material through a steel plant and watch it become a finished engineer."
Subhojeet is from Bokaro (Steel City) and did an ML traineeship at SAIL Bokaro Steel Plant. The site is one vertical journey through steelmaking stages with a molten "heat line" running along the page.

Stages:
0. THE GATE (hero): name, headline, 1-line pitch, CTAs [View projects] [Contact] [Standard view] [Resume PDF]
1. RAW MATERIAL (Education + Skills): skills grouped as "raw materials"; education card
2. THE FURNACE (Experience + Leadership): timeline of 2 roles + GDG core team
3. THE ROLLING MILL (Projects + Control Room): projects as "billets" rolled into "coils" (case-study cards)
4. QUALITY LAB (Achievements & Certifications): styled as a Mill Test Certificate table with status column (FINALIST / CERTIFIED)
5. DISPATCH (Contact): consignment/dispatch slip with email, LinkedIn, GitHub, LeetCode, Resume PDF
Contact must also be in the sticky header on every screen size.

## Signature mechanic: CONTROL ROOM (top of Rolling Mill)
- Title: "Control Room: what matters to you?"
- 5 sliders (0-10): Machine Learning, Full-Stack Engineering, Real-time Systems, Real-world Safety/Impact, Research Rigor.
- 3 presets: "ML Engineer role", "Full-Stack role", "Research role".
- Projects re-rank live (animated FLIP reorder) by match score.
- score(project) = Σ(weight_i × attribute_i) / Σ(weight_i), attributes in [0,1]. All weights 0 → default resume order. Ties → stable original order.
- "How is this calculated?" disclosure shows the formula (transparency is the demo).
- Each card shows its score + mini bar breakdown per axis.
- 100% client-side, pure typed function with unit tests, no backend/API keys.
- Attributes (in content file, labelled "my self-assessment"; axes order: ML, FullStack, Realtime, Impact, Research):
  - Text-Sensor Fusion: 0.95, 0.5, 0.4, 0.7, 0.95
  - CareLink: 0.85, 0.9, 0.7, 0.8, 0.5
  - SafeSphere: 0.5, 0.95, 0.85, 0.9, 0.3
- Fully keyboard operable; aria-live region announces the new top project.

## Content rules (single source of truth)
ALL content lives in one typed file (/content/profile.ts); render everything from it. Use the resume text below VERBATIM. Never invent metrics, employers, quotes, testimonials, or links. Missing info = visible TODO placeholder + entry in TODO.md.

Name: Subhojeet Chanda
Email: subhojeetchanda18@gmail.com
Phone: +91 9835194489 (NOT in page HTML by default; behind a "Reveal phone" button; config flag)
Links: LinkedIn, GitHub, LeetCode, project GitHub/Live links, certificate links: all TODO placeholders (I will supply URLs)

Experience
- SDE Intern, SecPen Labs (Remote), Apr 2025 – Jul 2025
  • Optimized Next.js frontend performance using code-splitting, asset compression, and Tailwind CSS, reducing page-load time by 20%.
  • Architected a JSON-driven content pipeline with dynamic chapter routing, achieving 100% data consistency across all pages.
  • Improved technical SEO through structured metadata and sitemap optimization, increasing organic traffic by 15%.
- Project Trainee, SAIL (Steel Authority of India Limited) Bokaro Steel Plant, Jun 2025 – Jul 2025
  • Developed and evaluated predictive ML models in Python across 5 industrial datasets, identifying operational patterns that informed 3 process-efficiency recommendations.
  • Validated model performance against real-world plant data and refined fault-detection logic, improving detection reliability by 12%.
  • Applied supervised learning and feature-engineering techniques to 4 plant-floor problems, balancing predictive accuracy with deployment scalability.

Projects
1. Confidence-Weighted Text-Sensor Fusion for Urban Routing | Python, XGBoost, FastAPI | GitHub | Live Link
  • Engineered a confidence-weighted multimodal fusion framework in Python, XGBoost, and FastAPI, upweighting text-based hazard signals (municipal advisories, news) over sensor data in proportion to their disagreement with sensor trends.
  • Designed a dose-based exposure model (concentration × time × activity-adjusted breathing rate) to rank candidate routes by estimated inhaled PM2.5 exposure instead of coarse AQI category.
  • Benchmarked sensor-only, text-only, naive-fusion, and confidence-weighted XGBoost models, lifting route-safety accuracy by 9%, confirmed via paired Wilcoxon significance testing.
2. CareLink: AI Diagnostic Assistant | Next.js, Node.js, TensorFlow, Firebase, Socket.io | GitHub | Live Link
  • Built a dual-interface AI-assisted radiology platform with Next.js, Node.js, TensorFlow, and Firebase, powered by a DenseNet121 CNN with Grad-CAM for explainable X-ray classification at 91% accuracy.
  • Combined Tesseract OCR with a FAISS-indexed RAG pipeline over MedlinePlus to translate medical jargon into plain language for patients.
  • Established a safety layer using WebSockets and browser sensor APIs, enabling fall detection and GPS-based SOS alerts within 3 seconds.
3. SafeSphere | Next.js, Node.js, Express, TypeScript, Hyperledger, XGBoost – Smart India Hackathon 2025 | GitHub | Live Link
  • Spearheaded a smart tourist safety platform using Next.js, Node.js, Express.js, TypeScript, and XGBoost, cutting incident response time by 30% through anomaly detection and geo-fencing.
  • Deployed blockchain-backed digital tourist IDs and real-time risk-zone alerts on Hyperledger for tamper-resistant records.
  • Delivered authority dashboards featuring live geospatial heatmaps, e-FIR automation, and multilingual support.

Technical Skills
- Languages: Java, Python, C++, C, JavaScript, TypeScript, SQL, HTML5, CSS3
- Frontend: React, Next.js, Tailwind CSS
- Backend: Node.js, Express.js, Flask, FastAPI, Socket.io
- AI/ML: TensorFlow, Keras, XGBoost, LangChain, Computer Vision, RAG, Predictive Modeling
- Databases & Cloud: PostgreSQL, MongoDB, Firebase, AWS, Google Cloud, Microsoft Azure, Render, Netlify, Pinecone
- DevOps & Tools: Git, GitHub Actions, Docker, Postman, MLflow, FAISS, Tesseract OCR
- Concepts: Data Structures & Algorithms, Full-Stack Architecture, Reinforcement Learning, Federated Learning, Bayesian Optimization, Sequential Text Parsing

Education
- Vellore Institute of Technology – AP, Amaravati, Andhra Pradesh. B.Tech CSE, Sep 2023 – Expected May 2027.

Leadership
- AI/ML and Data Analytics Core Team, Google Developer Groups (GDG) VIT-AP, Aug 2024 – Jul 2025
  • Contributed to AI/ML research initiatives within an 8-member cross-functional core team, evaluating emerging technologies through technical discussions.
  • Organized 4 technical workshops, hackathons, and coding sessions reaching 150+ students on Google technologies for the student developer community.

Achievements & Certifications
- Smart India Hackathon (SIH) 2025 – National Finalist (Waitlist)
- VIT Bhopal Health Hackathon – Finalist, hosted in collaboration with Johns Hopkins University
- Data Structures and Algorithms with Java – Certificate of Completion (link TODO)
- The Full Stack Web Development Bootcamp – Udemy Certificate of Completion (link TODO)

Copy to draft (I will review; honest, specific, no buzzwords):
- Headline suggestion: "Forged in Bokaro. Built to hold up in the real world."
- 2-3 sentence About connecting: steel-city upbringing, ML on real plant data at SAIL, explainable safety-oriented AI systems. Flag any claim you are unsure about.

## Visual system
- Mood: industrial editorial, dark, warm, tactile. NOT neon cyberpunk, NOT glassmorphism, NOT purple gradients.
- Tokens (CSS variables, dark default, light supported): --ink #0E0F11, --steel #2A2D31, --steel-light #8A9099, --paper #EDE8DF, --molten #FF5A1F, --ember #FFB020, --slag #5B2A1A. Use --molten only for the heat line, active states, key CTAs. WCAG AA contrast everywhere.
- Fonts via next/font (self-hosted, fallbacks): Barlow Condensed (display, bold uppercase), IBM Plex Mono (UI/data), Inter (body).
- Texture: subtle grain, thin grid lines, stamped-metal labels, "HEAT NO. 0001", "GRADE: SDE-2027" tags (decorative only).
- HEAT LINE: thin vertical line on the left (top on mobile) filling with a molten gradient on scroll, with a temperature readout (25°C → ~1,600°C at Dispatch). aria-hidden. Stage badges: 01 RAW MATERIAL, 02 FURNACE, etc.
- Project cards look like steel coil tags with a spec table (Stack, Role, Result); metrics as large numerals.
- Clean, lots of negative space, not a cluttered simulation.

## Motion
GSAP+ScrollTrigger OR Framer Motion (pick one, justify). Transforms/opacity only. Effects: heat-line fill, stage badge "stamp" in, project cards "roll in" (short horizontal wipe), FLIP reorder, light canvas-2D hero embers (max ~40 particles, paused off-screen/tab hidden, disabled for reduced motion and low-end devices). prefers-reduced-motion disables all non-essential motion. No autoplay audio; optional OFF-by-default "Ambience" toggle, lazy-loaded. No WebGL/Three.js.

## Navigation & fallbacks
- Sticky header: name (left), stage links, [Contact] always visible, [Standard view] toggle.
- STANDARD VIEW: plain, fast, printable one-page resume + projects. Persisted in localStorage, also at /standard, and via "Skip to standard view" link at top of DOM. It must be good, not an afterthought.
- Skip-to-content link, visible focus rings, logical tab order.
- Resume PDF at /public/Subhojeet_Chanda_Resume.pdf (I provide it) linked in header and Dispatch.
- Easter egg: Konami code or 5 clicks on the stage-0 heat number → temperature readout shows "1,600°C – POUR" and reveals a "Bonus: how this site was built" note. Never hide essential info behind it.

## Tech stack
Next.js (latest stable, App Router) + TypeScript strict + Tailwind. Static rendering where possible; deploy to Vercel. Optional MDX case studies at /projects/[slug] (Problem → Approach → Result → Stack → Links), facts from the resume only, TODO markers otherwise. Contact = mailto + copy-email button (no backend). Vitest for scoring; Playwright smoke tests. ESLint + Prettier. Conventional commits. README.

## Mobile-first
Design for 360px first. Stages stack; Control Room sliders become a compact accordion; full-width cards; heat line on the left edge; tap targets ≥ 44px; no horizontal scroll.

## Accessibility (non-negotiable)
Semantic HTML, one h1, proper heading order, real text, alt text or aria-hidden, full keyboard support, focus-visible, AA contrast, reduced motion, aria-live for Control Room, native labelled range inputs. Lighthouse Accessibility ≥ 95.

## Performance
Mobile Lighthouse: Performance ≥ 90, LCP < 2.0s, CLS < 0.05, INP good. Minimal first-load JS; lazy-load effects and below-the-fold; next/image; no font layout shift. No third-party scripts except privacy-friendly analytics in Phase 5.

## SEO & sharing
Metadata API, unique titles/descriptions, canonical, sitemap.xml, robots.txt, JSON-LD Person (name, jobTitle placeholder, alumniOf VIT-AP, sameAs), next/og Open Graph image 1200×630 in Forged style, favicons. Key content in initial HTML.

## DO NOT
Generic templates, stock hero sections, "Hi, I'm..." openers, skill progress bars/percentages, fake testimonials, heavy 3D, autoplay sound, cursor hijacking, scroll-jacking, full-screen loaders, hiding essential info behind interactions, claims not in the resume ("expert", employee counts, revenue). If a requirement conflicts with performance or accessibility, say so and propose an alternative instead of silently dropping it.

## Working rules
- Work strictly phase by phase. At the end of each phase: summarize what you built, run lint/typecheck/tests/build, list open TODOs, and STOP for my review.
- Never start the next phase on your own.
- Keep docs/PLAN.md and TODO.md updated.
