import { profile } from '@/content/profile';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TraceabilityQR from '@/components/static/TraceabilityQR';

// Use generateStaticParams to statically generate all project pages
export function generateStaticParams() {
  return profile.projects.map((p) => ({
    slug: p.slug || p.id,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const project = profile.projects.find((p) => (p.slug || p.id) === slug);

  if (!project) {
    notFound();
  }

  // Derive case study sections from resume bullet points as best as possible
  // Since we only have 3 bullet points per project in the resume, we approximate:
  // BP 1 & 2 -> Approach
  // BP 3 -> Result
  const problem = project.problem || "[ TODO: Add 1-2 sentences describing the core problem this project solves ]";
  const approach = project.bulletPoints.slice(0, 2);
  const result = project.bulletPoints.length > 2 ? project.bulletPoints[project.bulletPoints.length - 1] : "[ TODO: Add explicit result metrics ]";

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 md:py-32">
      <Link href="/#rolling-mill" className="font-mono text-sm text-steel-light hover:text-molten transition-colors mb-12 inline-block">
        &larr; Back to Rolling Mill
      </Link>

      <h1 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8 text-paper">
        {project.title}
      </h1>

      <div className="flex flex-wrap gap-2 mb-12">
        {project.stack.map((tech, j) => (
          <span key={j} className="font-mono text-xs text-paper bg-ink border border-steel px-2 py-1">
            {tech}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 flex flex-col gap-12">
          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-paper mb-4 border-b border-steel pb-2">The Problem</h2>
            <p className="font-sans text-steel-light leading-relaxed">{problem}</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-paper mb-4 border-b border-steel pb-2">The Approach</h2>
            <ul className="flex flex-col gap-4">
              {approach.map((bp, i) => (
                <li key={i} className="font-sans text-steel-light leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-molten">
                  {bp}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold uppercase text-paper mb-4 border-b border-steel pb-2">The Result</h2>
            <p className="font-sans text-paper font-bold leading-relaxed">{result}</p>
          </section>
        </div>

        <div>
          <div className="bg-steel/5 border border-steel p-6">
            <h2 className="font-mono text-sm font-bold text-steel-light uppercase mb-6 border-b border-steel pb-2">Links & Resources</h2>
            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-[10px] text-steel-light uppercase block mb-1">GitHub Repository</span>
                <a href={project.links.github !== 'TODO' ? project.links.github : '#'} className="font-mono text-sm text-molten hover:underline truncate block">
                  {project.links.github === 'TODO' ? 'TODO (Check docs/TODO.md)' : project.links.github}
                </a>
              </div>
              <div>
                <span className="font-mono text-[10px] text-steel-light uppercase block mb-1">Live Deployment</span>
                <a href={project.links.live !== 'TODO' ? project.links.live : '#'} className="font-mono text-sm text-molten hover:underline truncate block">
                  {project.links.live === 'TODO' ? 'TODO (Check docs/TODO.md)' : project.links.live}
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-steel flex justify-center">
              <TraceabilityQR url={`https://subhojeetchanda.vercel.app/projects/${slug}`} label="PROJECT TRACEABILITY" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
