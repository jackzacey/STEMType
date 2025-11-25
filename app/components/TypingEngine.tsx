'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
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

  // Reset everything when term changes
  useEffect(() => {
    setCursor(0);
    setStates(chars.map(() => 'untyped'));
  }, [termIndex]);

  // The invisible input — ONLY to steal focus, never reads value
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [termIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent page scroll, zoom, etc.
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const finished = cursor === chars.length && states.every(s => s === 'correct');
        if (finished) {
          confetti({
            particleCount: 400,
            spread: 130,
            origin: { y: 0.55 },
          });
          setTermIndex(i => i + 1);
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (cursor > 0) {
          setCursor(c => c - 1);
          setStates(prev => {
            const next = [...prev];
            next[cursor - 1] = 'untyped';
            return next;
          });
        }
        return;
      }

      // Normal character
      if (e.key.length === 1 && cursor < chars.length) {
        e.preventDefault();
        const correct = e.key === chars[cursor];
        setStates(prev => {
          const next = [...prev];
          next[cursor] = correct ? 'correct' : 'incorrect';
          return next;
        });
        setCursor(c => c + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursor, states, chars, termIndex]);

  const isComplete = cursor === chars.length && states.every(s => s === 'correct');

  return (
    <>
      {/* Invisible focus-stealer — pointer-events auto, opacity 0 */}
      <input
        ref={inputRef}
        type="text"
        className="fixed inset-0 opacity-0"
        autoFocus
        tabIndex={-1}
      />

      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono text-white">
        <h1 className="mb-20 text-6xl font-black text-cyan-400 md:text-8xl tracking-tight">
          {current.term}
        </h1>

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
                className={`relative inline-block transition-all duration-75 ${
                  states[i] === 'correct'
                    ? 'text-white'
                    : states[i] === 'incorrect'
                      ? 'text-red-500'
                      : 'text-gray-500 opacity-40'
                }`}
              >
                {char === ' ' ? '\u00A0' : char}

                {/* Blinking cyan caret */}
                {i === cursor && (
                  <span className="absolute -left-1 top-0 h-full w-1.5 bg-cyan-400 animate-pulse" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="fixed bottom-12 flex gap-16 text-2xl text-gray-400">
          <span>{termIndex + 1} / {terms.length}</span>
          <span className={isComplete ? 'text-green-400' : 'text-cyan-400'}>
            {isComplete ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>
      </div>
    </>
  );
}
