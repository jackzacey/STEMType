'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-9xl font-bold text-green-400">
        UNIT COMPLETE! 🎉
      </div>
    );
  }

  const chars = current.def.split('');

  // Reset on new term
  useEffect(() => {
    setCharIndex(0);
    setStates(chars.map(() => 'untyped'));
  }, [termIndex]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Prevent scrolling, default actions
      if (['ArrowUp', 'ArrowDown', ' '].includes(e.key)) e.preventDefault();

      // ENTER = submit only if fully correct
      if (e.key === 'Enter') {
        e.preventDefault();
        const allCorrect = states.every(s => s === 'correct') && charIndex === chars.length;
        if (allCorrect) {
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

      // BACKSPACE
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
          setStates(prev => {
            const copy = [...prev];
            copy[charIndex - 1] = 'untyped';
            return copy;
          });
        }
        return;
      }

      // Regular character
      if (e.key.length === 1 && charIndex < chars.length) {
        e.preventDefault();
        const expected = chars[charIndex];
        const isCorrect = e.key === expected;

        setStates(prev => {
          const copy = [...prev];
          copy[charIndex] = isCorrect ? 'correct' : 'incorrect';
          return copy;
        });

        setCharIndex(prev => prev + 1);

        // Auto-advance if perfect
        if (charIndex + 1 === chars.length && isCorrect && states.slice(0, -1).every(s => s === 'correct')) {
          setTimeout(() => {
            confetti({
              particleCount: 350,
              spread: 120,
              origin: { y: 0.55 },
            });
            setTermIndex(i => i + 1);
          }, 400);
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [charIndex, states, chars.length, termIndex]);

  const isFinished = charIndex === chars.length && states.every(s => s === 'correct');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono text-white">
      {/* Term */}
      <h1 className="mb-24 text-6xl font-black text-cyan-400 md:text-8xl tracking-tight">
        {current.term}
      </h1>

      {/* Text */}
      <div className="relative max-w-6xl">
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
                  : 'text-gray-500 opacity-40'   // ← dimmed untyped
              }`}
            >
              {char === ' ' ? '\u00A0' : char}

              {/* CYAN CARET */}
              {i === charIndex && (
                <span className="absolute -left-1 top-0 h-full w-1 bg-cyan-400 animate-pulse opacity-80" />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="fixed bottom-12 flex gap-16 text-2xl text-gray-400">
        <span>
          {termIndex + 1} / {terms.length}
        </span>
        <span className={isFinished ? 'text-green-400' : 'text-cyan-400'}>
          {isFinished ? 'Press Enter →' : 'Keep typing'}
        </span>
      </div>
    </div>
  );
}
