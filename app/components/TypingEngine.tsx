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
      <div className="min-h-screen flex items-center justify-center text-9xl font-bold text-green-400">
        Unit Complete! 🎉
      </div>
    );
  }

  const words = current.def.split(' ');
  const typedWords = input.split(' ');

  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim().toLowerCase() === current.def.toLowerCase()) {
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#60a5fa', '#34d399', '#fbbf24', '#c084fc'],
        });
        setIndex(i => i + 1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Invisible full-power input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 opacity-0"
        autoFocus
      />

      <div className="min-h-screen flex flex-col justify-center items-center px-8 bg-black text-white">
        {/* Term */}
        <h1 className="text-6xl md:text-8xl font-black text-cyan-400 mb-20 tracking-tight">
          {current.term}
        </h1>

        {/* EXACT MONKEYTYPE TEXT DISPLAY — HUGE, CENTERED, ARIAL */}
        <div className="max-w-6xl w-full">
          <div className="text-6xl md:text-7xl lg:text-8xl leading-tight text-center font-sans select-none" style={{ fontFamily: 'Arial, sans-serif' }}>
            {words.map((word, i) => {
              const typed = typedWords[i] || '';
              const isCurrent = i === typedWords.length - 1;
              const isCorrect = typed === word && typed !== '';
              const isWrong = typed && typed !== word;

              return (
                <span key={i} className="inline-block mx-2">
                  {word.split('').map((char, j) => {
                    const typedChar = typed[j] || '';
                    const correct = typedChar === char;
                    const extra = j >= word.length;

                    return (
                      <span
                        key={j}
                        className={`
                          ${i < typedWords.length - 1
                            ? isCorrect ? 'text-white' : 'text-red-500'
                            : isCurrent
                              ? extra
                                ? 'text-red-500 bg-red-500/30'
                                : correct
                                  ? 'text-white'
                                  : typedChar
                                    ? 'text-red-500 bg-red-500/30'
                                    : 'text-gray-500'
                              : 'text-gray-500'
                          }
                          ${isCurrent ? 'underline decoration-cyan-500 decoration-4 underline-offset-8' : ''}
                        `}
                      >
                        {extra ? typedChar : char}
                      </span>
                    );
                  })}
                  {isCurrent && typed.length > word.length && (
                    <span className="text-red-500 bg-red-500/30">
                      {typed.slice(word.length)}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Bottom status */}
        <div className="fixed bottom-10 text-gray-400 text-2xl flex gap-10">
          <span>{index + 1} / {terms.length}</span>
          <span className="text-cyan-400">Press Enter to submit</span>
        </div>
      </div>
    </>
  );
}
