'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentDef = terms[index]?.def || '';
  const currentTerm = terms[index]?.term || '';

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.toLowerCase() === currentDef.toLowerCase()) {
        confetti({
          particleCount: 300,
          spread: 120,
          origin: { y: 0.55 },
          colors: ['#60a5fa', '#34d399', '#fbbf24', '#c084fc', '#f87171'],
        });
        setIndex(i => i + 1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Hidden real input — this is how MonkeyType does it */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 opacity-0 caret-transparent"
        autoFocus
      />

      <div className="min-h-screen flex flex-col justify-center items-center bg-[#1e1e1e] text-white px-8">
        {/* Term */}
        <h1 className="text-6xl md:text-8xl font-black text-cyan-400 mb-20 tracking-tight">
          {currentTerm}
        </h1>

        {/* PERFECT CHARACTER-BY-CHARACTER RENDERING */}
        <div className="max-w-5xl w-full">
          <div
            className="text-6xl md:text-7xl lg:text-8xl leading-snug text-center font-mono select-none"
            style={{
              fontFamily: '"Roboto Mono", Menlo, monospace',
              letterSpacing: '0.05em',
              lineHeight: '1.4',
            }}
          >
            {currentDef.split('').map((char, i) => {
              const typedChar = input[i];
              const isCorrect = typedChar === char;
              const isCurrent = i === input.length;
              const isExtra = i >= currentDef.length;

              if (isExtra) {
                return (
                  <span key={i} className="text-red-500 bg-red-500/30">
                    {typedChar}
                  </span>
                );
              }

              return (
                <span
                  key={i}
                  className={`
                    relative transition-all duration-75
                    ${i < input.length
                      ? isCorrect
                        ? 'text-white'
                        : 'text-red-500'
                      : 'text-gray-500'
                    }
                  `}
                >
                  {char}
                  {/* Blinking caret */}
                  {isCurrent && (
                    <span className="absolute -left-1 w-1 h-full bg-cyan-400 animate-pulse" />
                  )}
                </span>
              );
            })}

            {/* Extra characters after end */}
            {input.length > currentDef.length &&
              input.slice(currentDef.length).split('').map((char, i) => (
                <span key={`extra-${i}`} className="text-red-500 bg-red-500/30">
                  {char}
                </span>
              ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-12 text-gray-400 text-2xl flex gap-12">
          <span>{index + 1} / {terms.length}</span>
          <span className="text-cyan-400">Enter to submit • Perfect = Confetti</span>
        </div>
      </div>
    </>
  );
}
