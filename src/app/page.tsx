import { profile } from '@/content/profile';
import Link from 'next/link';
import CopyEmail from '@/components/common/CopyEmail';
import PhoneReveal from '@/components/common/PhoneReveal';
import ProjectSection from '@/components/interactive/ProjectSection';
import HeatLine from '@/components/interactive/HeatLine';
import EasterEggHero from '@/components/interactive/EasterEggHero';
import StageBadge from '@/components/interactive/StageBadge';
import { FadeIn, SlideInLeft, StampBadge, TimelineDot, FadeInRow } from '@/components/interactive/Animations';
import PointerSheen from '@/components/interactive/PointerSheen';
import MetricText from '@/components/interactive/MetricText';
import TelemetryStrip from '@/components/interactive/TelemetryStrip';
import ProductionLedger from '@/components/interactive/ledger/ProductionLedger';
import ConsignmentForm from '@/components/interactive/dispatch/ConsignmentForm';
import PlantShiftClock from '@/components/interactive/dispatch/PlantShiftClock';
import ReplayIntroButton from '@/components/interactive/ReplayIntroButton';
import SelfAuditCertificate from '@/components/static/SelfAuditCertificate';
import ContentIntegritySeal from '@/components/static/ContentIntegritySeal';
import TraceabilityQR from '@/components/static/TraceabilityQR';
import SkillsInventory from '@/components/interactive/SkillsInventory';
import TerminalCommandBar from '@/components/interactive/TerminalCommandBar';
import dynamic from 'next/dynamic';

const TheVault = dynamic(() => import('@/components/interactive/TheVault'));
const CommitTicker = dynamic(() => import('@/components/interactive/CommitTicker'));
const HeroEmbers = dynamic(() => import('@/components/interactive/HeroEmbers'));
const HeroNamePour = dynamic(() => import('@/components/interactive/HeroNamePour'), { ssr: true });
import FailureArchive from '@/components/static/FailureArchive';

export default function Home() {
  return (
    <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row">
      
      <HeatLine />

      <div className="flex-1 px-4 md:px-12 pb-32">
        {/* STAGE 0: THE GATE (HERO) */}
        <section id="gate" className="min-h-[85vh] flex flex-col justify-center py-20 relative">
          <HeroEmbers />
          <EasterEggHero />
          
          <FadeIn delay={0.1}>
            <HeroNamePour name={profile.name} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-mono text-xl md:text-2xl text-molten mb-6 max-w-3xl">
              {profile.about.headline}
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="font-sans text-steel-light max-w-2xl text-lg mb-10 leading-relaxed">
              {profile.about.summary}
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-wrap gap-4">
              <PointerSheen className="inline-block transition-transform duration-300 hover:scale-105 w-full sm:w-auto">
                <Link href="#rolling-mill" className="bg-molten text-ink font-mono px-6 py-3 font-bold hover:bg-ember transition-colors block h-full w-full text-center">
                  VIEW PROJECTS
                </Link>
              </PointerSheen>
              <PointerSheen className="inline-block transition-transform duration-300 hover:-translate-y-1 w-full sm:w-auto">
                <Link href="/#dispatch" className="border border-steel text-paper font-mono px-6 py-3 hover:border-steel-light hover:bg-steel/10 transition-colors block h-full w-full text-center">
                  CONTACT
                </Link>
              </PointerSheen>
              <div className="ml-auto hidden md:block">
                <TraceabilityQR url="https://subhojeetchanda.vercel.app/trace" label="SITE TRACEABILITY" />
              </div>
            </div>
          </FadeIn>
        </section>
        
        {/* TELEMETRY STRIP */}
        <TelemetryStrip />

        {/* STAGE 1: RAW MATERIAL */}
        <section id="raw-material" className="py-24 border-t border-steel relative mt-12">
          <StageBadge text="01 RAW MATERIAL" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
            <SkillsInventory />
            
            <div>
              <FadeIn delay={0.4}>
                <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper">Education Base</h3>
                <div className="border border-steel p-6 bg-steel/10 flex flex-col h-full transition-all duration-300 hover:-translate-y-1 hover:border-steel-light hover:shadow-[0_0_15px_rgba(255,87,34,0.15)]">
                  <h4 className="font-sans font-bold text-lg text-paper mb-2">{profile.education.degree}</h4>
                  <p className="font-mono text-sm text-steel-light mb-auto">{profile.education.institution}</p>
                  <div className="mt-6 pt-4 border-t border-steel font-mono text-sm text-molten">
                    {profile.education.startDate} – {profile.education.endDate}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* STAGE 2: THE FURNACE */}
        <section id="furnace" className="py-24 border-t border-steel relative">
          <StageBadge text="02 THE FURNACE" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-12 text-paper mt-8">Experience & Leadership</h3>
          
          <div className="relative border-l border-steel ml-4 md:ml-6 pl-8 md:pl-12 flex flex-col gap-16">
            {[...profile.experience, ...profile.leadership].map((item, i) => (
              <SlideInLeft key={i} delay={i * 0.1} className="relative group">
                {/* Timeline dot */}
                <TimelineDot className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 outline outline-4 outline-ink transition-colors duration-500" />
                
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                  <h4 className="font-sans font-bold text-xl text-paper group-hover:text-molten transition-colors duration-300">{item.role}</h4>
                  <span className="font-mono text-sm text-molten">{item.startDate} – {item.endDate}</span>
                </div>
                <p className="font-mono text-sm text-steel-light mb-4">{item.company} | {item.location}</p>
                <ul className="flex flex-col gap-3">
                  {item.bulletPoints.map((bp, j) => (
                    <li key={j} className="font-sans text-paper/90 leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-steel-light group-hover:before:bg-molten before:transition-colors before:duration-300">
                      <MetricText>{bp}</MetricText>
                    </li>
                  ))}
                </ul>
              </SlideInLeft>
            ))}
          </div>
        </section>

        {/* STAGE 3: THE ROLLING MILL */}
        <section id="rolling-mill" className="py-24 border-t border-steel relative">
          <StageBadge text="03 THE ROLLING MILL" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper mt-8">Projects & Output</h3>

          <ProjectSection projects={profile.projects} />
        </section>
        
        {/* STAGE 3B: PRODUCTION LEDGER */}
        <ProductionLedger />

        {/* STAGE 4: QUALITY LAB */}
        <section id="quality-lab" className="py-24 border-t border-steel relative">
          <StageBadge text="04 QUALITY LAB" />
          
          <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper mt-8">Mill Test Certificate</h3>
          <div className="overflow-x-auto border border-steel mb-12">
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
                  <FadeInRow key={i} delay={i * 0.05} className="border-b border-steel last:border-0 hover:bg-steel/5 transition-colors group">
                    <td className="p-4 font-medium text-paper">{ach.title}</td>
                    <td className="p-4 text-steel-light">{ach.issuer}</td>
                    <td className="p-4 text-right">
                      <span className="font-mono text-xs px-2 py-1 bg-ink border border-steel text-paper transition-colors group-hover:bg-steel/20 group-hover:border-steel-light">
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
                  </FadeInRow>
                ))}
              </tbody>
            </table>
          </div>
        <div className="mt-16">
          <SelfAuditCertificate />
        </div>
        </section>

        {/* STAGE 4B: FAILURE ARCHIVE */}
        <FailureArchive />

        {/* STAGE 5: DISPATCH */}
        <section id="dispatch" className="py-24 border-t border-steel relative">
          <StageBadge text="05 DISPATCH" />
          
          <div className="mt-8 flex flex-col lg:flex-row gap-12">
            
            <div className="flex-1 max-w-2xl">
              <ConsignmentForm />
            </div>
            
            <div className="flex-1 flex flex-col gap-8">
              <div className="bg-steel/5 p-6 border border-steel/50">
                <PlantShiftClock />
                
                {(profile.contactInfo?.openTo || profile.contactInfo?.basedIn) && (
                  <div className="mt-6 flex flex-col gap-3 font-mono text-sm border-t border-steel/30 pt-6">
                    {profile.contactInfo.openTo && (
                      <div className="flex flex-col">
                        <span className="text-[10px] text-steel-light uppercase tracking-widest">Open To</span>
                        <span className="text-paper">{profile.contactInfo.openTo}</span>
                      </div>
                    )}
                    {profile.contactInfo.basedIn && (
                      <div className="flex flex-col">
                        <span className="text-[10px] text-steel-light uppercase tracking-widest">Based In</span>
                        <span className="text-paper">{profile.contactInfo.basedIn}</span>
                      </div>
                    )}
                    {profile.contactInfo.typicalReplyTime && (
                      <div className="flex flex-col">
                        <span className="text-[10px] text-steel-light uppercase tracking-widest">Typical Reply Time</span>
                        <span className="text-paper">{profile.contactInfo.typicalReplyTime}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {profile.about.behindTheSystem && (
                <div className="bg-steel/5 p-6 border border-steel/50">
                  <h4 className="font-mono font-bold text-sm mb-4 uppercase border-b border-steel pb-2 text-paper">Behind the System</h4>
                  <p className="font-sans text-steel-light leading-relaxed text-sm italic">
                    "{profile.about.behindTheSystem}"
                  </p>
                </div>
              )}
              
              <div>
                <TerminalCommandBar />
              </div>

              <div>
                <h4 className="font-mono font-bold text-sm mb-4 uppercase border-b border-steel pb-2 text-paper">Alternate Routes</h4>
                <div className="flex flex-col gap-3 font-mono text-sm">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-steel/20 pb-2">
                    <span className="uppercase text-steel-light">Email</span>
                    <CopyEmail email={profile.email} />
                  </div>
                  {profile.phone && !profile.phone.hiddenByDefault && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-steel/20 pb-2">
                      <span className="uppercase text-steel-light">Phone</span>
                      <PhoneReveal phone={profile.phone.number} />
                    </div>
                  )}
                  {profile.links.linkedin && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-steel/20 pb-2">
                      <span className="uppercase text-steel-light">LinkedIn</span>
                      {profile.links.linkedin === 'TODO' ? (
                        <span className="text-steel/50 cursor-not-allowed text-xs">[OFFLINE]</span>
                      ) : (
                        <a href={profile.links.linkedin} className="text-paper hover:underline hover:text-molten transition-colors">Profile</a>
                      )}
                    </div>
                  )}
                  {profile.links.github && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-steel/20 pb-2">
                      <span className="uppercase text-steel-light">GitHub</span>
                      {profile.links.github === 'TODO' ? (
                        <span className="text-steel/50 cursor-not-allowed text-xs">[OFFLINE]</span>
                      ) : (
                        <a href={profile.links.github} className="text-paper hover:underline hover:text-molten transition-colors">Profile</a>
                      )}
                    </div>
                  )}
                  {profile.links.leetcode && (
                    <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-steel/20 pb-2">
                      <span className="uppercase text-steel-light">LeetCode</span>
                      {profile.links.leetcode === 'TODO' ? (
                        <span className="text-steel/50 cursor-not-allowed text-xs">[OFFLINE]</span>
                      ) : (
                        <a href={profile.links.leetcode} className="text-paper hover:underline hover:text-molten transition-colors">Profile</a>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
            </div>
            
          </div>
        </section>

        {/* THE VAULT */}
        <TheVault />

        {/* CONTENT INTEGRITY SEAL */}
        <ContentIntegritySeal />
      </div>

      {/* Global Footer */}
      <footer className="w-full border-t border-steel/30 py-6 mt-12 flex flex-col items-center justify-center col-span-full relative">
        <ReplayIntroButton />
        <CommitTicker />
      </footer>
    </div>
  );
}
