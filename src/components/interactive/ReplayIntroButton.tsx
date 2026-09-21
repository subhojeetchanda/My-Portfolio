'use client';

export default function ReplayIntroButton() {
  return (
    <button 
      onClick={() => {
        localStorage.removeItem('forged:intro:v1');
        window.location.reload();
      }}
      className="font-mono text-[10px] text-steel-light uppercase hover:text-paper transition-colors underline underline-offset-4"
    >
      Replay Signature Intro
    </button>
  );
}
