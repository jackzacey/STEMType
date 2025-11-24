'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const current = terms[index];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-9xl font-bold text-green-400">
        UNIT COMPLETE! 🎉
      </div>
    );
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleSubmit = () => {
    if (input.toLowerCase() === current.def.toLowerCase()) {
      confetti({
        particleCount: 300,
        spread: 110,
        origin: { y: 0.55 },
        colors: ['#06b6d4', '#10b981', '#f59e0b', '#a78bfa', '#ef4444'],
      });
      setIndex(i => i + 1);
      setInput('');
    }
  };

  return (
    <>
      {/* Invisible real input — this is the real MonkeyType trick */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        className="fixed inset-0 opacity-0 outline-none"
        autoFocus
      />

      <div className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono">
        {/* Term */}
        <h1 className="mb-20 text-6xl font-black text-cyan-400 md:text-8xl">
          {current.term}
        </h1>

        {/* THE ACTUAL MONKEYTYPE TEXT RENDERING */}
        <div className="relative max-w-6xl">
          <div
            className="text-center text-6xl leading-snug tracking-wider md:text-7xl lg:text-8xl"
            style={{
              fontFamily: '"Roboto Mono", ui-monospace, monospace',
              letterSpacing: '0.04em',
              lineHeight: '1.4',
            }}
          >
            {current.def.split('').map((char, i) => {
              const typed = input[i];
              const isCorrect = typed === char;
              const isWrong = typed !== undefined && typed !== char;
              const isCurrent = i === input.length;

              return (
                <span
                  key={i}
                  className={`relative inline-block transition-all duration-75 ${
                    i < input.length
                      ? isCorrect
                        ? 'text-white'
                        : 'text-red-500'
                      : 'text-gray-500'
                  }`}
                >
                  {char === ' ' ? '\u00A0' : char}

                  {/* BLINKING CYAN CARET */}
                  {isCurrent && (
                    <span className="absolute -left-0.5 top-0 h-full w-1 bg-cyan-400 animate-pulse" />
                  )}
                </span>
              );
            })}

            {/* EXTRA CHARACTERS (typed past the end) */}
            {input.slice(current.def.length).split('').map((char, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/30">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-12 flex gap-12 text-xl text-gray-400">
          <span>{index + 1} / {terms.length}</span>
          <span className="text-cyan-400">Press Enter to submit</span>
        </div>
      </div>
    </>
  );
}
