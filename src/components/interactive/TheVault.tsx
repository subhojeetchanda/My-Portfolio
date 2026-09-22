'use client';

import React, { useState } from 'react';

export default function TheVault() {
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Cipher: "PLANT" shifted by +3 -> "SODQW"
  const ANSWER = "SODQW";

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.toUpperCase().trim() === ANSWER) {
      setUnlocked(true);
    } else {
      // Optional: add shake animation class
      setInput('');
    }
  };

  return (
    <div className="mt-32 max-w-2xl mx-auto border border-molten/50 p-8 bg-steel/5 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-molten/20"></div>
      
      {!unlocked ? (
        <div className="text-center">
          <svg className="w-8 h-8 text-molten mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="font-display text-2xl font-bold uppercase text-paper tracking-wider mb-2">The Vault</h3>
          <p className="font-mono text-sm text-steel-light mb-6">Access restricted. Engineering logs require decryption.</p>
          
          <form onSubmit={handleUnlock} className="flex flex-col items-center gap-4">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="ENTER PASSCODE"
              className="font-mono text-center bg-transparent border-b border-steel focus:border-molten outline-none text-paper placeholder-steel-light py-2 tracking-widest uppercase transition-colors w-48"
              aria-label="Vault passcode"
            />
            <button 
              type="submit"
              className="font-mono text-xs text-molten border border-molten/30 px-6 py-2 hover:bg-molten/10 transition-colors uppercase tracking-widest"
            >
              Unlock
            </button>
          </form>

          <div className="mt-8">
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-mono text-steel-light hover:text-paper transition-colors"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && (
              <p className="mt-2 text-xs font-mono text-steel-light/70 animate-fade-in">
                Shift the word "PLANT" forward by 3 letters in the alphabet.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="animate-fade-in text-left">
          <div className="flex items-center gap-3 mb-6 border-b border-steel/30 pb-4">
            <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            <h3 className="font-display text-xl font-bold uppercase text-emerald-500 tracking-wider">Access Granted</h3>
          </div>
          <div className="prose prose-invert prose-sm font-mono text-steel-light max-w-none">
            <p className="text-paper mb-4 font-bold">ENGINEERING LOG - [CLASSIFIED]</p>
            <p>
              This site was built without massive front-end frameworks dominating the initial load. 
              Interactive components are lazy-loaded client boundaries. The aesthetic relies on 
              CSS custom properties and pure SVGs, rather than heavy WebGL canvases.
            </p>
            <p className="mt-4">
              Lighthouse scores were prioritized from day one. Real metrics were bound directly to 
              React components via a centralized data store (profile.ts) to guarantee honesty in reporting.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
