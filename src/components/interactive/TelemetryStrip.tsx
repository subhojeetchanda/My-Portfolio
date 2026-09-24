import { profile } from '@/content/profile';
import MetricDisclosure from './MetricDisclosure';

export default function TelemetryStrip() {
  // Extract real numbers from the profile for the telemetry
  // These are statically typed here, but they represent the exact numbers in the resume.
  const telemetry = [
    { label: "DATASETS", value: "5", source: "Developed and evaluated predictive ML models in Python across 5 industrial datasets..." },
    { label: "RECOMMENDATIONS", value: "3", source: "Identifying operational patterns that informed 3 process-efficiency recommendations." },
    { label: "DETECTION RELIABILITY", value: "+12%", source: "Validated model performance against real-world plant data and refined fault-detection logic, improving detection reliability by 12%." },
    { label: "X-RAY CLASSIFICATION", value: "91%", source: "Powered by a DenseNet121 CNN with Grad-CAM for explainable X-ray classification at 91% accuracy." },
    { label: "INCIDENT RESPONSE", value: "-30%", source: "Spearheaded a smart tourist safety platform... cutting incident response time by 30% through anomaly detection and geo-fencing." },
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
        <div className="flex-1 min-w-0 overflow-hidden whitespace-nowrap">
          <div className="font-mono text-[10px] sm:text-xs text-steel-light flex items-center gap-6 sm:gap-12 animate-marquee">
            {/* Double it for infinite seamless scroll, or just show it if it fits */}
            <div className="flex items-center gap-6 sm:gap-12">
              {telemetry.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span>{t.label}:</span>
                  <MetricDisclosure 
                    value={<span className="text-paper font-bold">{t.value}</span>}
                    source={t.source}
                    label="Source"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
