import { profile } from '@/content/profile';
import StageBadge from '@/components/interactive/StageBadge';

export default function FailureArchive() {
  if (!profile.failures || profile.failures.length === 0) return null;

  return (
    <section id="failure-archive" className="py-24 border-t border-steel relative">
      <StageBadge text="04B FAILURE ARCHIVE" />
      
      <h3 className="font-display text-3xl font-bold uppercase mb-8 text-paper mt-8">Incident Log</h3>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {profile.failures.map((failure, idx) => (
          <div key={failure.id} className="border border-steel bg-steel/5 p-6 relative group transition-colors hover:bg-steel/10">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-steel-light text-xs">INCIDENT #{String(idx + 1).padStart(3, '0')}</span>
              <span className={`font-mono text-xs px-2 py-1 border ${failure.status === 'RESOLVED' ? 'bg-ink text-paper border-steel group-hover:bg-steel/20' : 'bg-molten/10 text-molten border-molten'}`}>
                {failure.status}
              </span>
            </div>
            
            <h4 className="font-display text-xl font-bold text-paper mb-6">{failure.title}</h4>
            
            <div className="space-y-4 font-sans text-sm">
              <div>
                <span className="font-mono text-xs text-steel-light uppercase block mb-1">Cause</span>
                <p className="text-paper/80 leading-relaxed">{failure.cause}</p>
              </div>
              
              <div>
                <span className="font-mono text-xs text-steel-light uppercase block mb-1">Resolution</span>
                <p className="text-paper/80 leading-relaxed">{failure.resolution}</p>
              </div>
              
              <div className="pt-4 border-t border-steel/30 mt-4">
                <span className="font-mono text-xs text-molten uppercase block mb-1">Lesson</span>
                <p className="text-paper leading-relaxed">{failure.lesson}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
