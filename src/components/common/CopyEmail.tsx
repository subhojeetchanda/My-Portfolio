'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyEmailProps {
  email?: string;
  className?: string;
}

export default function CopyEmail({ email, className = '' }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email!);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email', err);
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <a href={`mailto:${email}`} className="text-molten hover:underline font-mono">
        {email}
      </a>
      <button 
        onClick={handleCopy}
        className="text-steel-light hover:text-paper transition-colors print:hidden p-1"
        aria-label="Copy email address"
        title="Copy email address"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}
