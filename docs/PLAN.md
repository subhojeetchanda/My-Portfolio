# Phase 0: Planning & Architecture

## 1. Repo Structure
```text
/
├── content/
│   └── profile.ts         # Single source of truth for all data and typed schemas
├── docs/
│   ├── BRIEF.md           # Project requirements
│   ├── PLAN.md            # This document
│   └── TODO.md            # Track missing content and URLs
├── public/
│   ├── fonts/             # Self-hosted Barlow Condensed, IBM Plex Mono, Inter
│   ├── images/            # Open Graph image, Easter egg assets
│   └── Subhojeet_Chanda_Resume.pdf
├── src/
│   ├── app/
│   │   ├── (interactive)/ # Main interactive portfolio group
│   │   │   ├── page.tsx   # The Gate, Raw Material, Furnace, Rolling Mill, Quality Lab, Dispatch
│   │   │   └── layout.tsx # Layout with Sticky Header and HeatLine
│   │   ├── standard/
│   │   │   └── page.tsx   # Standard, print-friendly static resume view
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx # Optional MDX case studies
│   │   ├── layout.tsx     # Root layout (fonts, providers, meta, inline FOUC script)
│   │   └── globals.css    # CSS variables and Tailwind imports
│   ├── components/
│   │   ├── common/        # Buttons, typography, Section tags
│   │   ├── layout/        # Header, Footer
│   │   ├── interactive/   # ControlRoom, ProjectList (Client), HeatLine (Client), HeroCanvas (Client)
│   │   └── static/        # EducationCard, Timeline, CertTable, DispatchSlip
│   ├── lib/
│   │   ├── utils.ts       # Tailwind merging, formatting helpers
│   │   └── scoring.ts     # Pure function for project ranking
│   └── __tests__/
│       └── scoring.test.ts# Vitest tests for ranking logic
```

## 2. Component List
| Component | Purpose | Type | Client-side JS Reason (if Client) |
| :--- | :--- | :--- | :--- |
| `Header` | Sticky navigation & standard view toggle | Server | (Uses Next.js Links, toggle logic uses vanilla JS / native forms or small client wrapper) |
| `GateSection` | Hero content (Name, Headline, CTAs) | Server | Pure static HTML/CSS. |
| `HeroEmbers` | Canvas-based floating embers | Client | Requires `canvas` API, `requestAnimationFrame`, `IntersectionObserver`, and `matchMedia`. |
| `HeatLine` | Vertical scroll progress & temp readout | Client | Needs window scroll event listener and bounding rects to calculate molten fill height. |
| `StaticSections`| Raw Material, Furnace, Quality Lab, Dispatch | Server | Renders static profile data. |
| `ControlRoom` | Sliders & logic to rerank projects | Client | React state for sliders, `onChange` handlers. |
| `ProjectList` | Wraps project cards with FLIP animation | Client | Needs to re-render in new order and animate via Framer Motion `<motion.div layout>`. |

## 3. Content Schema (`content/profile.ts`)
```typescript
export type Experience = {
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
};

export type ProjectAttributes = {
  ml: number;
  fullStack: number;
  realTime: number;
  impact: number;
  research: number;
};

export type Project = {
  id: string;
  title: string;
  stack: string[];
  links: { github: string | 'TODO'; live: string | 'TODO' };
  bulletPoints: string[];
  attributes: ProjectAttributes;
  slug?: string;
};

export type ProfileData = {
  name: string;
  email: string;
  phone: { number: string; hiddenByDefault: boolean };
  links: { linkedin: string | 'TODO'; github: string | 'TODO'; leetcode: string | 'TODO' };
  about: { headline: string; summary: string };
  experience: Experience[];
  leadership: Experience[];
  projects: Project[];
  skills: { category: string; items: string[] }[];
  education: { institution: string; degree: string; startDate: string; endDate: string };
  achievements: { title: string; status: 'FINALIST' | 'CERTIFIED' | 'WAITLIST' | string; link?: string | 'TODO'; issuer?: string }[];
};
```

## 4. Design Tokens
CSS Variables mapped in `globals.css`:
```css
:root {
  --ink: #0E0F11;
  --steel: #2A2D31;
  --steel-light: #8A9099;
  --paper: #EDE8DF;
  --molten: #FF5A1F;
  --ember: #FFB020;
  --slag: #5B2A1A;
}
```
**Tailwind Theme**: Extended to map these exactly (e.g., `bg-ink`, `text-paper`, `border-steel`).
**Type Scale**: `font-display` (Barlow Condensed), `font-mono` (IBM Plex Mono), `font-sans` (Inter).
**Spacing**: Rely on standard Tailwind intervals, utilizing `gap-16` / `gap-24` between sections to force negative space.

## 5. Animation Library Decision
**Recommendation: Framer Motion**
- **Justification**: The brief requires a FLIP reorder for the Control Room and `prefers-reduced-motion` fallbacks. Framer Motion has first-class FLIP support (`<motion.div layout>`) built-in without needing premium plugins (like GSAP's Flip plugin). It also has `useReducedMotion()` natively.
- **Bundle Size**: We can use Framer Motion's `LazyMotion` and `m` components (or just lazy load the interactive components) to keep the initial JS payload tiny and meet the LCP < 2.0s requirement.
- **Heat Line**: Can be implemented efficiently using Framer Motion's `useScroll` and `useTransform` without complex timeline imperative code.

## 6. Routing & View Plan
- **Interactive View**: Served at `/` with the full layout.
- **Standard View**: Served at `/standard`.
- **Toggle Mechanism**: To avoid Flash of Unstyled Content (FOUC), an inline `<script>` in the root `layout.tsx` checks `localStorage.getItem('standardView')`. If true, it either redirects to `/standard` immediately or adds a `data-view="standard"` class to `<html>` that CSS uses to strip formatting. Given App Router, physically navigating between `/` and `/standard` using Next.js `<Link prefetch={false}>` paired with `localStorage` is the cleanest way to guarantee zero JS overhead on the static view.

## 7. Risks & Mitigations
| Risk | Conflict | Mitigation |
| :--- | :--- | :--- |
| **Canvas Embers JS Thread** | Heavy JS vs Performance (INP) | Disable if `prefers-reduced-motion`, cap at 40 particles, pause via `IntersectionObserver` when scrolled out of view or tab is hidden. |
| **Re-ranking Accessibility** | Live updates confusing screen readers | Wrap the top-ranked project title in an `aria-live="polite"` region to announce changes when sliders are moved. |
| **Interactive Bundle Size** | Framer Motion vs LCP < 2.0s | Isolate `ControlRoom` and `ProjectList` into a single Client Component boundary and lazy-load it (`next/dynamic`) so the critical path HTML renders instantly. |

## 8. Questions for You
1. Should the "Reveal phone" button state be persisted in localStorage, or reset on page refresh?
2. Do you have the URLs ready for the TODO links, or should I leave them as `TODO` placeholders for you to fill later?
3. Should I set up the optional MDX infrastructure for `/projects/[slug]` in this build, or stick strictly to the single-page layout for now?
4. How many projects will be visible by default? (I assume all 3 based on the brief).
5. For the 2-3 sentence 'About' summary, I will draft: *"Born in India's Steel City and shaped by deploying ML models on the floor of the SAIL Bokaro Steel Plant. I build explainable, safety-oriented AI systems engineered for real-world impact, prioritizing reliability over hype."* Does this work?

## 9. Phase-by-Phase Checklist
- [ ] **Phase 1: Foundation.** Initialize Next.js, configure Tailwind/tokens, load fonts, create `content/profile.ts` with verbatim data.
- [ ] **Phase 2: Static Assembly.** Build Server Components for Gate, Raw Material, Furnace, Quality Lab, and Dispatch. Setup routing.
- [ ] **Phase 3: Standard View & Navigation.** Implement `/standard` layout, sticky header, and `localStorage` toggle script.
- [ ] **Phase 4: The Heat Line & Embers.** Implement scroll-driven Heat Line and optimized canvas hero embers.
- [ ] **Phase 5: The Control Room.** Build the pure scoring function, unit tests, slider UI, and Framer Motion FLIP reorder with `aria-live`.
- [ ] **Phase 6: Polish & SEO.** Easter egg, Metadata, JSON-LD, accessibility audit (Lighthouse >= 95), Playwright smoke tests, final review.
