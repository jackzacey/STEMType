'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-9xl font-bold text-green-400">
        UNIT COMPLETE! 🎉
      </div>
    );
  }

  const chars = current.def.split('');

  // Reset when term changes
  useEffect(() => {
    setCharIndex(0);
    setStates(chars.map(() => 'untyped'));
  }, [termIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (charIndex === chars.length && states.every(s => s === 'correct')) {
          confetti({
            particleCount: 350,
            spread: 120,
            origin: { y: 0.55 },
            colors: ['#06b6d4', '#10b981', '#f59e0b', '#a78bfa', '#ef4444'],
          });
          setTermIndex(i => i + 1);
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (charIndex > 0) {
          setCharIndex(i => i - 1);
          setStates(prev => {
            const next = [...prev];
            next[charIndex - 1] = 'untyped';
            return next;
          });
        }
        return;
      }

      if (e.key.length === 1 && charIndex < chars.length) {
        e.preventDefault();
        const isCorrect = e.key === chars[charIndex];
        setStates(prev => {
          const next = [...prev];
          next[charIndex] = isCorrect ? 'correct' : 'incorrect';
          return next;
        });
        setCharIndex(i => i + 1);

        // Auto-submit when finished perfectly
        if (charIndex + 1 === chars.length && states.slice(0, -1).every(s => s === 'correct') && isCorrect) {
          setTimeout(() => {
            confetti({
              particleCount: 350,
              spread: 120,
              origin: { y: 0.55 },
            });
            setTermIndex(i => i + 1);
          }, 300);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [charIndex, states, chars, termIndex]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono text-white">
      {/* Term */}
      <h1 className="mb-24 text-6xl font-black text-cyan-400 md:text-8xl">
        {current.term}
      </h1>

      {/* Text + Caret */}
      <div ref={containerRef} className="relative max-w-6xl">
        <div
          className="text-center text-6xl leading-snug tracking-wider md:text-7xl lg:text-8xl"
          style={{
            fontFamily: '"Roboto Mono", ui-monospace, monospace',
            letterSpacing: '0.04em',
            lineHeight: '1.5',
          }}
        >
          {chars.map((char, i) => (
            <span
              key={i}
              className={`relative inline-block transition-all duration-100 ${
                states[i] === 'correct'
                  ? 'text-white'
                  : states[i] === 'incorrect'
                  ? 'text-red-500'
                  : 'text-gray-500 opacity-50'
              }`}
            >
              {char === ' ' ? '\u00A0' : char}

              {/* CARET — only on current index */}
              {i === charIndex && (
                <span className="absolute -left-1 top-0 h-full w-1 bg-cyan-400 animate-pulse" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-12 flex gap-12 text-xl text-gray-400">
        <span>
          {termIndex + 1} / {terms.length}
        </span>
        <span className="text-cyan-400">
          {charIndex === chars.length ? 'Press Enter →' : 'Keep typing'}
        </span>
      </div>
    </div>
  );
}
