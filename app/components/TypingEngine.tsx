'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-9xl font-bold text-green-400">
        UNIT COMPLETE! 🎉
      </div>
    );
  }

  const expected = current.def;

  useEffect(() => {
    inputRef.current?.focus();
  }, [termIndex]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Prevent typing past the expected length + extra chars
    if (value.length > expected.length + 50) return;
    setInput(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input === expected) {
        confetti({
          particleCount: 400,
          spread: 120,
          origin: { y: 0.55 },
        });
        setTimeout(() => {
          setTermIndex(i => i + 1);
          setInput('');
        }, 300);
      }
    }
  };

  return (
    <>
      {/* THE HIDDEN INPUT — this is the real MonkeyType trick */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 opacity-0 pointer-events-none"
        autoFocus
      />

      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono text-white">
        {/* Term */}
        <h1 className="mb-20 text-6xl font-black text-cyan-400 md:text-8xl tracking-tight">
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
            {expected.split('').map((char, i) => {
              const typed = input[i];
              const isCorrect = typed === char;
              const isWrong = typed !== undefined && typed !== char;
              const isUntyped = input.length <= i;

              return (
                <span
                  key={i}
                  className={`relative inline-block transition-all duration-100 ${
                    isUntyped ? 'text-gray-500 opacity-40' :
                    isCorrect ? 'text-white' :
                    'text-red-500'
                  }`}
                >
                  {char === ' ' ? '\u00A0' : char}

                  {/* CARET */}
                  {i === input.length && (
                    <span className="absolute -left-1 top-0 h-full w-1 bg-cyan-400 animate-pulse opacity-80" />
                  )}
                </span>
              );
            })}

            {/* Extra characters */}
            {input.slice(expected.length).split('').map((char, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/30">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-12 flex gap-16 text-2xl text-gray-400">
          <span>{termIndex + 1} / {terms.length}</span>
          <span className={input === expected ? 'text-green-400' : 'text-cyan-400'}>
            {input === expected ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>
      </div>
    </>
  );
}
