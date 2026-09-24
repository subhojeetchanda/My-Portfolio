'use client';

import { useState, useRef } from 'react';

export default function TerminalCommandBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    switch (cmd) {
      case 'help':
        setOutput('Available commands: projects, skills, experience, contact, clear, close');
        break;
      case 'projects':
        document.getElementById('rolling-mill')?.scrollIntoView({ behavior: 'smooth' });
        setOutput('Navigating to projects...');
        break;
      case 'skills':
        document.getElementById('raw-material')?.scrollIntoView({ behavior: 'smooth' });
        setOutput('Navigating to skills...');
        break;
      case 'experience':
        document.getElementById('furnace')?.scrollIntoView({ behavior: 'smooth' });
        setOutput('Navigating to experience...');
        break;
      case 'contact':
        document.getElementById('dispatch')?.scrollIntoView({ behavior: 'smooth' });
        setOutput('Navigating to contact...');
        break;
      case 'clear':
        setOutput(null);
        break;
      case 'close':
        setIsOpen(false);
        break;
      default:
        if (cmd === '') return;
        setOutput(`Command not found: ${cmd}. Type 'help' for options.`);
    }
    
    setInput('');
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="font-mono text-xs text-molten border border-molten px-4 py-2 hover:bg-molten/10 transition-colors bg-ink"
      >
        &gt;_ OPEN TERMINAL
      </button>
    );
  }

  return (
    <div className="bg-ink border border-steel p-4 flex flex-col gap-2 relative mt-4">
      <button 
        onClick={() => setIsOpen(false)}
        className="absolute top-2 right-4 text-steel-light hover:text-paper font-mono"
        aria-label="Close terminal"
      >
        [X]
      </button>
      
      <div className="font-mono text-[10px] text-steel-light uppercase tracking-widest mb-2 border-b border-steel/30 pb-2">
        Terminal Access
      </div>
      
      {output && (
        <div className="font-mono text-xs text-paper mb-2 bg-steel/10 p-2 border-l-2 border-molten">
          {output}
        </div>
      )}
      
      <form onSubmit={handleCommand} className="flex items-center gap-2">
        <span className="font-mono text-molten">&gt;_</span>
        <input 
          ref={inputRef}
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none font-mono text-sm text-paper flex-1"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
