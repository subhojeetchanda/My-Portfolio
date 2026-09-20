import { profile } from '@/content/profile';

export default function TelemetryStrip() {
  // Extract real numbers from the profile for the telemetry
  // These are statically typed here, but they represent the exact numbers in the resume.
  const telemetry = [
    { label: "DATASETS", value: "5" },
    { label: "RECOMMENDATIONS", value: "3" },
    { label: "DETECTION RELIABILITY", value: "+12%" },
    { label: "X-RAY CLASSIFICATION", value: "91%" },
    { label: "INCIDENT RESPONSE", value: "-30%" },
  ];

  return (
    <div className="border-y border-steel bg-ink overflow-hidden py-1.5 flex items-center -mx-4 md:-mx-12 px-4 md:px-12">
      <div className="w-full flex items-center justify-between gap-4">
        
        {/* Blinking Status LED */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-2 h-2 rounded-full bg-molten animate-pulse-slow shadow-[0_0_8px_rgba(255,90,31,0.8)]" aria-hidden="true"></div>
          <span className="font-mono text-[10px] text-molten uppercase font-bold tracking-widest hidden sm:inline">SYS.ONLINE</span>
        </div>

        {/* Scrolling or static strip */}
        <div className="flex-1 overflow-hidden whitespace-nowrap">
          <div className="font-mono text-[10px] sm:text-xs text-steel-light flex items-center gap-6 sm:gap-12 animate-marquee">
            {/* Double it for infinite seamless scroll, or just show it if it fits */}
            <div className="flex items-center gap-6 sm:gap-12">
              {telemetry.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>{t.label}:</span>
                  <span className="text-paper font-bold">{t.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
