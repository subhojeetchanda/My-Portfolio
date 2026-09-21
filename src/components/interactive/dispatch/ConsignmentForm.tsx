'use client';

import { useState, useRef, useEffect, useId } from 'react';
import { sendDispatch } from '@/actions/dispatch';
import { StampBadge } from '../Animations';
import CopyEmail from '@/components/common/CopyEmail';

export default function ConsignmentForm() {
  const formId = useId();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [receipt, setReceipt] = useState('');
  const [timestamp, setTimestamp] = useState(0);
  const [charCount, setCharCount] = useState(0);
  
  const formRef = useRef<HTMLFormElement>(null);

  // Set timestamp on mount for time-on-page check
  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    formData.append('timestamp', timestamp.toString());

    try {
      const result = await sendDispatch(formData);
      if (result.success) {
        setStatus('success');
        setReceipt(result.receipt || 'DSP-SUCCESS');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Unknown error occurred.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Failed to reach the dispatch desk.');
    }
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(receipt);
    alert('Receipt copied to clipboard');
  };

  if (status === 'success') {
    return (
      <div className="border border-steel bg-ink p-8 relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('/grid.svg')] mix-blend-overlay"></div>
        
        <div className="relative z-10 max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <StampBadge>
              <span className="font-display text-2xl font-bold text-molten border-2 border-molten px-2 py-0.5 shadow-sm">DISPATCHED</span>
            </StampBadge>
          </div>
          
          <h3 className="font-display text-2xl text-paper uppercase mb-4">Consignment Logged</h3>
          <p className="font-sans text-steel-light mb-8">
            Your message has been securely routed. Keep your receipt number for your records.
          </p>
          
          <div className="bg-steel/10 border border-steel p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] text-steel-light uppercase tracking-widest mb-1">Receipt No.</div>
              <div className="font-mono text-lg text-paper">{receipt}</div>
            </div>
            <button 
              onClick={handleCopyReceipt}
              className="font-mono text-xs border border-steel px-4 py-2 text-paper hover:bg-steel/20 transition-colors whitespace-nowrap"
            >
              COPY RECEIPT
            </button>
          </div>
          
          <button 
            onClick={() => {
              setStatus('idle');
              setTimestamp(Date.now());
              if (formRef.current) formRef.current.reset();
              setCharCount(0);
            }}
            className="font-mono text-xs text-steel-light hover:text-paper underline underline-offset-4 transition-colors"
          >
            SEND ANOTHER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-steel bg-ink relative">
      <div className="border-b border-steel bg-steel/5 p-4 flex items-center justify-between">
        <h4 className="font-mono text-sm text-paper uppercase tracking-widest">Consignment Note</h4>
        <span className="font-mono text-[10px] text-steel-light uppercase">Form DSP-01</span>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="p-4 md:p-8 flex flex-col gap-6" aria-label="Contact Form">
        
        {/* Honeypot */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="honey">Do not fill this out if you are human</label>
          <input type="text" name="honey" id="honey" tabIndex={-1} autoComplete="off" />
        </div>

        {/* Status Messages */}
        <div aria-live="polite">
          {status === 'error' && (
            <div className="bg-red-950/50 border border-red-500/50 p-4 mb-4 flex flex-col gap-3">
              <p className="font-mono text-xs text-red-400">{errorMessage}</p>
              <div className="pt-2 border-t border-red-900/50">
                <p className="font-sans text-sm text-steel-light mb-2">Fallback route available:</p>
                <CopyEmail className="justify-start text-xs border-red-900/50 hover:bg-red-900/20" />
              </div>
            </div>
          )}
        </div>

        {/* Sender Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-name`} className="font-mono text-[10px] text-steel-light uppercase tracking-widest">
              From (Name) *
            </label>
            <input 
              required
              type="text" 
              id={`${formId}-name`}
              name="name" 
              maxLength={100}
              className="bg-transparent border-b border-steel/50 focus:border-paper outline-none font-sans text-paper py-2 transition-colors placeholder:text-steel-light"
              placeholder="Your name or organization"
              disabled={status === 'submitting'}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor={`${formId}-email`} className="font-mono text-[10px] text-steel-light uppercase tracking-widest">
              Reply-To (Email) *
            </label>
            <input 
              required
              type="email" 
              id={`${formId}-email`}
              name="email" 
              maxLength={100}
              className="bg-transparent border-b border-steel/50 focus:border-paper outline-none font-sans text-paper py-2 transition-colors placeholder:text-steel-light"
              placeholder="Return address"
              disabled={status === 'submitting'}
            />
          </div>
        </div>

        {/* Consignment Type */}
        <div className="flex flex-col gap-3 mt-2">
          <label className="font-mono text-[10px] text-steel-light uppercase tracking-widest">
            Consignment Type *
          </label>
          <div className="flex flex-wrap gap-3">
            {['Internship', 'Full-time role', 'Collaboration', 'Just saying hi'].map((type, i) => (
              <label key={type} className="relative cursor-pointer group">
                <input 
                  type="radio" 
                  name="type" 
                  value={type} 
                  required
                  defaultChecked={i === 0}
                  className="peer sr-only"
                  disabled={status === 'submitting'}
                />
                <span className="inline-block px-4 py-2 border border-steel text-steel-light font-sans text-sm transition-colors peer-checked:bg-paper peer-checked:text-ink peer-checked:border-paper peer-focus-visible:ring-2 peer-focus-visible:ring-paper peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink hover:bg-steel/10">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 mt-2 relative">
          <div className="flex justify-between items-end">
            <label htmlFor={`${formId}-msg`} className="font-mono text-[10px] text-steel-light uppercase tracking-widest">
              Contents (Message) *
            </label>
            <span className={`font-mono text-[10px] ${charCount > 1400 ? 'text-amber-500' : 'text-steel-light/50'}`}>
              {charCount}/1500
            </span>
          </div>
          <textarea 
            required
            id={`${formId}-msg`}
            name="message" 
            rows={5}
            maxLength={1500}
            minLength={10}
            onChange={(e) => setCharCount(e.target.value.length)}
            className="bg-steel/5 border border-steel/50 focus:border-paper outline-none font-sans text-paper p-4 resize-y transition-colors placeholder:text-steel-light min-h-[120px]"
            placeholder="Specify details here..."
            disabled={status === 'submitting'}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="mt-4 pt-6 border-t border-steel/30 flex justify-end">
          <button 
            type="submit" 
            disabled={status === 'submitting'}
            className="group relative px-8 py-4 bg-paper text-ink font-mono font-bold uppercase tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:ring-paper"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            <span className="relative z-10">
              {status === 'submitting' ? 'Transmitting...' : 'Dispatch'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
