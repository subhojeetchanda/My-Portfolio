import { useId } from "react";

interface AlloyCompositionProps {
  data: Record<string, number>;
}

export default function AlloyComposition({ data }: AlloyCompositionProps) {
  const tableId = useId();

  // Process data
  const totalBytes = Object.values(data).reduce((acc, val) => acc + val, 0);
  
  // Sort and get top 6
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 6);
  const others = sorted.slice(6);
  
  const othersBytes = others.reduce((acc, val) => acc + val[1], 0);
  
  const items = [...top];
  if (othersBytes > 0) {
    items.push(["Others", othersBytes]);
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-mono text-sm text-paper uppercase tracking-widest">Alloy Composition</h4>
        <span className="font-mono text-[10px] text-steel-light uppercase">Mill Test Cert.</span>
      </div>
      <p className="font-sans text-xs text-steel-light mb-6" id={tableId}>
        Composition of my public repositories, by bytes of code.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-describedby={tableId}>
          <thead>
            <tr className="border-b border-steel text-steel-light font-mono text-[10px] uppercase tracking-wider">
              <th className="py-2 pr-4 font-normal">Element</th>
              <th className="py-2 pr-4 font-normal text-right w-16">Content %</th>
              <th className="py-2 pl-4 font-normal w-full hidden sm:table-cell">Visual</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs">
            {items.map(([name, bytes]) => {
              const percentage = totalBytes > 0 ? (bytes / totalBytes) * 100 : 0;
              const formattedPct = percentage.toFixed(1);
              return (
                <tr key={name} className="border-b border-steel/30 last:border-0 hover:bg-steel/5 transition-colors">
                  <td className="py-3 pr-4 text-paper">{name}</td>
                  <td className="py-3 pr-4 text-steel-light text-right">{formattedPct}%</td>
                  <td className="py-3 pl-4 hidden sm:table-cell align-middle">
                    <div className="w-full h-1 bg-steel/20 relative rounded-sm overflow-hidden" aria-hidden="true">
                      <div 
                        className="absolute top-0 left-0 h-full bg-paper/80" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
