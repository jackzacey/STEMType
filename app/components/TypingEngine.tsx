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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim().toLowerCase() === current.def.toLowerCase()) {
        confetti({
          particleCount: 250,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'],
        });
        setIndex(i => i + 1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Invisible input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 opacity-0 caret-transparent"
        autoFocus
      />

      {/* MONKEYTYPE.EXACT BACKGROUND */}
      <div className="min-h-screen flex flex-col justify-center items-center px-8 bg-[#1a1a1a] text-white">

        {/* Term */}
        <h1 className="text-5xl md:text-7xl font-black text-cyan-400 mb-16 tracking-tight opacity-90">
          {current.term}
        </h1>

        {/* MONKEYTYPE TEXT — PIXEL PERFECT */}
        <div className="max-w-6xl w-full">
          <div 
            className="text-6xl md:text-7xl lg:text-8xl leading-tight text-center select-none"
            style={{
              fontFamily: '"Roboto Mono", "Courier New", monospace',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: '1.4',
            }}
          >
            {words.map((word, i) => {
              const typed = typedWords[i] || '';
              const isCurrent = i === typedWords.length - 1;
              const isCorrect = typed === word && typed !== '';
              const isWrong = typed && typed !== word;

              return (
                <span key={i} className="inline-block mx-1.5">
                  {word.split('').map((char, j) => {
                    const typedChar = typed[j] || '';
                    const correct = typedChar === char;
                    const extra = j >= word.length;

                    return (
                      <span
                        key={j}
                        className={`
                          transition-all duration-75
                          ${i < typedWords.length - 1
                            ? isCorrect ? 'text-white' : 'text-red-400'
                            : isCurrent
                              ? extra
                                ? 'text-red-400 bg-red-400/20'
                                : correct
                                  ? 'text-white'
                                  : typedChar
                                    ? 'text-red-400 bg-red-400/20'
                                    : 'text-gray-600'
                              : 'text-gray-600'
                          }
                          ${isCurrent ? 'underline decoration-4 decoration-cyan-400 underline-offset-8' : ''}
                        `}
                      >
                        {extra ? typedChar : char}
                      </span>
                    );
                  })}
                  {isCurrent && typed.length > word.length && (
                    <span className="text-red-400 bg-red-400/20">
                      {typed.slice(word.length)}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Custom blinking caret */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="w-1 h-20 bg-cyan-400 animate-pulse opacity-80" />
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-10 text-gray-500 text-xl flex gap-12">
          <span>{index + 1} / {terms.length}</span>
          <span className="text-cyan-400">Enter ↵ to submit</span>
        </div>
      </div>
    </>
  );
}
