import { profile } from '@/content/profile';
import Link from 'next/link';
import CopyEmail from '@/components/common/CopyEmail';
import PhoneReveal from '@/components/common/PhoneReveal';
import ProjectSection from '@/components/interactive/ProjectSection';
import HeatLine from '@/components/interactive/HeatLine';
import EasterEggHero from '@/components/interactive/EasterEggHero';
import StageBadge from '@/components/interactive/StageBadge';
import dynamic from 'next/dynamic';

const HeroEmbers = dynamic(() => import('@/components/interactive/HeroEmbers'));

export default function Home() {
  return (
    <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row">
      
      <HeatLine />

      <div className="flex-1 px-4 md:px-12 pb-32">
        {/* STAGE 0: THE GATE (HERO) */}
        <section id="gate" className="min-h-[85vh] flex flex-col justify-center py-20 relative">
          <HeroEmbers />
          <EasterEggHero />
          
          <h1 className="font-display text-6xl md:text-8xl font-bold uppercase mb-6 text-paper leading-none tracking-tight">
            {profile.name}
          </h1>
          <h2 className="font-mono text-xl md:text-2xl text-molten mb-6 max-w-3xl">
            {profile.about.headline}
          </h2>
          <p className="font-sans text-steel-light max-w-2xl text-lg mb-10 leading-relaxed">
            {profile.about.summary}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="#rolling-mill" className="bg-molten text-ink font-mono px-6 py-3 font-bold hover:bg-ember transition-colors">
              VIEW PROJECTS
            </Link>
            <Link href="#dispatch" className="border border-steel text-paper font-mono px-6 py-3 hover:border-steel-light transition-colors">
              CONTACT
            </Link>
          </div>
        </section>

        {/* STAGE 1: RAW MATERIAL */}
        <section id="raw-material" className="py-24 border-t border-steel relative">
          <StageBadge text="01 RAW MATERIAL" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
            <div className="lg:col-span-2">
              <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper">Skills Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.skills.map((group, i) => (
                  <div key={i} className="border border-steel p-6 bg-steel/10">
                    <h4 className="font-mono text-xs text-steel-light uppercase mb-3 border-b border-steel pb-2">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, j) => (
                        <span key={j} className="font-sans text-sm text-paper bg-ink border border-steel px-2 py-1">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper">Education Base</h3>
              <div className="border border-steel p-6 bg-steel/10 flex flex-col h-full">
                <h4 className="font-sans font-bold text-lg text-paper mb-2">{profile.education.degree}</h4>
                <p className="font-mono text-sm text-steel-light mb-auto">{profile.education.institution}</p>
                <div className="mt-6 pt-4 border-t border-steel font-mono text-sm text-molten">
                  {profile.education.startDate} – {profile.education.endDate}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STAGE 2: THE FURNACE */}
        <section id="furnace" className="py-24 border-t border-steel relative">
          <StageBadge text="02 THE FURNACE" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-12 text-paper mt-8">Experience & Leadership</h3>
          
          <div className="relative border-l border-steel ml-4 md:ml-6 pl-8 md:pl-12 flex flex-col gap-16">
            {[...profile.experience, ...profile.leadership].map((item, i) => (
              <div key={i} className="relative">
                {/* Timeline dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 bg-molten outline outline-4 outline-ink"></div>
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <h4 className="font-sans font-bold text-xl text-paper">{item.role}</h4>
                  <span className="font-mono text-sm text-molten">{item.startDate} – {item.endDate}</span>
                </div>
                <p className="font-mono text-sm text-steel-light mb-4">{item.company} | {item.location}</p>
                <ul className="flex flex-col gap-3">
                  {item.bulletPoints.map((bp, j) => (
                    <li key={j} className="font-sans text-paper/90 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-steel-light">
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* STAGE 3: THE ROLLING MILL */}
        <section id="rolling-mill" className="py-24 border-t border-steel relative">
          <StageBadge text="03 THE ROLLING MILL" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper mt-8">Projects & Output</h3>

          <ProjectSection projects={profile.projects} />
        </section>

        {/* STAGE 4: QUALITY LAB */}
        <section id="quality-lab" className="py-24 border-t border-steel relative">
          <StageBadge text="04 QUALITY LAB" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper mt-8">Mill Test Certificate</h3>
          <div className="overflow-x-auto border border-steel">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-steel bg-steel/10 font-mono text-xs text-steel-light uppercase tracking-wider">
                  <th scope="col" className="p-4 font-normal">Test Item / Title</th>
                  <th scope="col" className="p-4 font-normal">Issuer / Event</th>
                  <th scope="col" className="p-4 font-normal text-right">Result</th>
                  <th scope="col" className="p-4 font-normal text-center">Reference</th>
                </tr>
              </thead>
              <tbody className="font-sans text-sm">
                {profile.achievements.map((ach, i) => (
                  <tr key={i} className="border-b border-steel last:border-0 hover:bg-steel/5 transition-colors">
                    <td className="p-4 font-medium text-paper">{ach.title}</td>
                    <td className="p-4 text-steel-light">{ach.issuer}</td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-xs px-2 py-1 bg-ink border border-steel text-paper">
                        {ach.status}
                      </span>
                    </td>
                    <td className="p-4 text-center font-mono text-xs">
                      {ach.link && ach.link !== 'TODO' ? (
                        <a href={ach.link} className="text-molten hover:underline">Verify</a>
                      ) : (
                        <span className="text-steel-light">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* STAGE 5: DISPATCH */}
        <section id="dispatch" className="py-24 border-t border-steel relative">
          <StageBadge text="05 DISPATCH" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper mt-8">Consignment Slip</h3>
          
          <div className="max-w-xl bg-paper text-ink p-8 border-4 border-double border-ink relative">
            <div className="absolute top-4 right-4 border-2 border-ink p-1 rotate-12">
              <span className="font-display text-2xl font-bold text-molten border-2 border-molten px-2 py-0.5">READY</span>
            </div>
            
            <h4 className="font-mono font-bold text-xl mb-6 uppercase border-b-2 border-ink pb-2">Dest: Network</h4>
            
            <div className="flex flex-col gap-4 font-mono text-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-ink/20 pb-2">
                <span className="uppercase text-ink/70 font-bold">Email</span>
                <CopyEmail email={profile.email} />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-ink/20 pb-2">
                <span className="uppercase text-ink/70 font-bold">Phone</span>
                <PhoneReveal phone={profile.phone.number} />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-ink/20 pb-2">
                <span className="uppercase text-ink/70 font-bold">LinkedIn</span>
                <a href={profile.links.linkedin !== 'TODO' ? profile.links.linkedin : '#'} className="hover:underline">{profile.links.linkedin === 'TODO' ? 'TODO' : 'Profile'}</a>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-ink/20 pb-2">
                <span className="uppercase text-ink/70 font-bold">GitHub</span>
                <a href={profile.links.github !== 'TODO' ? profile.links.github : '#'} className="hover:underline">{profile.links.github === 'TODO' ? 'TODO' : 'Profile'}</a>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-ink/20 pb-2">
                <span className="uppercase text-ink/70 font-bold">LeetCode</span>
                <a href={profile.links.leetcode !== 'TODO' ? profile.links.leetcode : '#'} className="hover:underline">{profile.links.leetcode === 'TODO' ? 'TODO' : 'Profile'}</a>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between pt-4">
                <span className="uppercase text-ink/70 font-bold">Documentation</span>
                <a href="/Subhojeet_Chanda_Resume.pdf" target="_blank" className="bg-ink text-paper px-4 py-2 hover:bg-steel transition-colors font-bold text-center mt-2 md:mt-0">
                  DOWNLOAD RESUME
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
