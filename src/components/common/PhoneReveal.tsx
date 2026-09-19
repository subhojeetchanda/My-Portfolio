'use client';

import { useState } from 'react';

interface PhoneRevealProps {
  phone: string;
}

export default function PhoneReveal({ phone }: PhoneRevealProps) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-molten hover:underline font-mono">{phone}</a>;
  }

  return (
    <button 
      onClick={() => setRevealed(true)}
      className="text-steel-light hover:text-paper text-sm font-mono border border-steel px-2 py-1 transition-colors print:hidden"
    >
      Reveal Phone
    </button>
  );
}
