import { profile } from '@/content/profile';
import PhoneReveal from '@/components/common/PhoneReveal';
import CopyEmail from '@/components/common/CopyEmail';

export default function StandardView() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-24 print:py-0 print:px-0 bg-ink print:bg-white text-paper print:text-black">
      
      {/* HEADER SECTION */}
      <section className="mb-12 print:mb-8">
        <h1 className="font-display text-5xl md:text-7xl font-bold uppercase mb-4 text-paper print:text-black">
          {profile.name}
        </h1>
        <p className="font-mono text-xl mb-6 text-molten print:text-black">{profile.about.headline}</p>
        <p className="font-sans text-steel-light print:text-black max-w-2xl mb-8 leading-relaxed">
          {profile.about.summary}
        </p>
        
        {/* CONTACT & LINKS */}
        <div id="contact" className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm border-t border-b border-steel print:border-gray-300 py-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-steel-light print:text-gray-600 uppercase tracking-wider mb-2">Contact</h2>
            <CopyEmail email={profile.email} />
            <PhoneReveal phone={profile.phone.number} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-steel-light print:text-gray-600 uppercase tracking-wider mb-2">Links</h2>
            <div className="flex flex-col gap-1">
              <a href={profile.links.linkedin !== 'TODO' ? profile.links.linkedin : '#'} className="hover:text-molten hover:underline transition-colors">LinkedIn: {profile.links.linkedin}</a>
              <a href={profile.links.github !== 'TODO' ? profile.links.github : '#'} className="hover:text-molten hover:underline transition-colors">GitHub: {profile.links.github}</a>
              <a href={profile.links.leetcode !== 'TODO' ? profile.links.leetcode : '#'} className="hover:text-molten hover:underline transition-colors">LeetCode: {profile.links.leetcode}</a>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mb-12 print:mb-8">
        <h2 className="font-display text-3xl font-bold uppercase mb-6 text-paper print:text-black flex items-center gap-4">
          <span className="text-molten print:text-black">01</span> Experience
        </h2>
        <div className="flex flex-col gap-8 print:gap-6">
          {profile.experience.map((exp, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                <h3 className="font-sans font-bold text-lg text-paper print:text-black">{exp.role}</h3>
                <span className="font-mono text-sm text-molten print:text-black">{exp.startDate} – {exp.endDate}</span>
              </div>
              <p className="font-mono text-sm text-steel-light print:text-gray-700 mb-4">{exp.company} | {exp.location}</p>
              <ul className="list-disc pl-5 font-sans text-paper print:text-black flex flex-col gap-2">
                {exp.bulletPoints.map((bp, j) => (
                  <li key={j} className="leading-relaxed">{bp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section className="mb-12 print:mb-8">
        <h2 className="font-display text-3xl font-bold uppercase mb-6 text-paper print:text-black flex items-center gap-4">
          <span className="text-molten print:text-black">02</span> Projects
        </h2>
        <div className="flex flex-col gap-8 print:gap-6">
          {profile.projects.map((project, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-2">
                <h3 className="font-sans font-bold text-lg text-paper print:text-black">{project.title}</h3>
                <div className="flex gap-4 font-mono text-sm">
                  <a href={project.links.github !== 'TODO' ? project.links.github : '#'} className="text-molten hover:underline print:text-black">GitHub</a>
                  <a href={project.links.live !== 'TODO' ? project.links.live : '#'} className="text-molten hover:underline print:text-black">Live Link</a>
                </div>
              </div>
              <div className="font-mono text-xs text-steel-light print:text-gray-700 mb-4 flex flex-wrap gap-2">
                {project.stack.map((tech, j) => (
                  <span key={j} className="border border-steel print:border-gray-300 px-2 py-0.5">{tech}</span>
                ))}
              </div>
              <ul className="list-disc pl-5 font-sans text-paper print:text-black flex flex-col gap-2">
                {project.bulletPoints.map((bp, j) => (
                  <li key={j} className="leading-relaxed">{bp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS & EDUCATION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 print:gap-8 mb-12 print:mb-8">
        {/* SKILLS */}
        <section>
          <h2 className="font-display text-3xl font-bold uppercase mb-6 text-paper print:text-black flex items-center gap-4">
            <span className="text-molten print:text-black">03</span> Skills
          </h2>
          <div className="flex flex-col gap-4">
            {profile.skills.map((skillGroup, i) => (
              <div key={i}>
                <h3 className="font-mono text-sm text-steel-light print:text-gray-600 uppercase mb-1">{skillGroup.category}</h3>
                <p className="font-sans text-paper print:text-black">{skillGroup.skills.join(', ')}</p>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & LEADERSHIP */}
        <div className="flex flex-col gap-12 print:gap-8">
          <section>
            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-paper print:text-black flex items-center gap-4">
              <span className="text-molten print:text-black">04</span> Education
            </h2>
            <div className="flex flex-col gap-6">
              {profile.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-sans font-bold text-lg text-paper print:text-black">{edu.degree}</h3>
                  <p className="font-mono text-sm text-steel-light print:text-gray-700 mb-1">{edu.institution}</p>
                  {edu.skills && (
                    <p className="font-mono text-xs text-steel-light print:text-gray-600 mb-1">Skills: {edu.skills}</p>
                  )}
                  <p className="font-mono text-sm text-molten print:text-black">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-3xl font-bold uppercase mb-6 text-paper print:text-black flex items-center gap-4">
              <span className="text-molten print:text-black">05</span> Leadership
            </h2>
            <div className="flex flex-col gap-6">
              {profile.leadership.map((lead, i) => (
                <div key={i}>
                  <div className="flex flex-col mb-2">
                    <h3 className="font-sans font-bold text-lg text-paper print:text-black">{lead.role}</h3>
                    <p className="font-mono text-sm text-steel-light print:text-gray-700">{lead.company} | {lead.location}</p>
                    <p className="font-mono text-sm text-molten print:text-black mb-2">{lead.startDate} – {lead.endDate}</p>
                  </div>
                  <ul className="list-disc pl-5 font-sans text-paper print:text-black flex flex-col gap-2">
                    {lead.bulletPoints.map((bp, j) => (
                      <li key={j} className="leading-relaxed">{bp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <section className="mb-12 print:mb-8">
        <h2 className="font-display text-3xl font-bold uppercase mb-6 text-paper print:text-black flex items-center gap-4">
          <span className="text-molten print:text-black">06</span> Achievements
        </h2>
        <div className="border border-steel print:border-gray-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-steel print:border-gray-300 font-mono text-xs text-steel-light print:text-gray-600 uppercase">
                <th className="p-4 font-normal">Title</th>
                <th className="p-4 font-normal">Issuer / Details</th>
                <th className="p-4 font-normal text-right">Status</th>
              </tr>
            </thead>
            <tbody className="font-sans">
              {profile.achievements.map((ach, i) => (
                <tr key={i} className="border-b border-steel print:border-gray-300 last:border-0">
                  <td className="p-4">
                    {ach.link && ach.link !== 'TODO' ? (
                      <a href={ach.link} className="hover:text-molten hover:underline transition-colors">{ach.title}</a>
                    ) : (
                      <span>{ach.title}</span>
                    )}
                  </td>
                  <td className="p-4 text-steel-light print:text-gray-700 text-sm">{ach.issuer}</td>
                  <td className="p-4 text-right font-mono text-sm">
                    <span className="px-2 py-1 bg-steel/30 print:bg-gray-100 text-paper print:text-black inline-block">
                      {ach.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
