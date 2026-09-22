import React from 'react';
import QRCode from 'react-qr-code';

interface TraceabilityQRProps {
  url: string;
  label?: string;
  className?: string;
}

export default function TraceabilityQR({ url, label = "BATCH TRACEABILITY", className = "" }: TraceabilityQRProps) {
  return (
    <div className={`inline-flex flex-col items-center gap-2 border border-steel/30 p-2 bg-steel/5 ${className}`}>
      <h4 className="font-mono text-[10px] text-steel-light uppercase tracking-widest">{label}</h4>
      <div className="bg-paper p-1">
        <QRCode 
          value={url} 
          size={64} 
          bgColor="#dfdcd4" 
          fgColor="#1b1c1d" 
          level="L" 
        />
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="font-mono text-[8px] text-steel-light hover:text-molten transition-colors uppercase max-w-[80px] truncate"
        title={url}
      >
        {url.replace(/^https?:\/\//, '')}
      </a>
    </div>
  );
}
