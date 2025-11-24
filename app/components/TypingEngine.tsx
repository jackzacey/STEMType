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
      <div className="min-h-screen flex items-center justify-center text-8xl font-bold text-green-400">
        You Mastered This Unit! 🎉
      </div>
    );
  }

  const words = current.def.split(' ');
  const userWords = input.split(' ');
  const currentWordIndex = userWords.length - 1;
  const currentUserWord = userWords[currentWordIndex] || '';

  // Auto-focus on mount + every new term
  useEffect(() => {
    inputRef.current?.focus();
  }, [index]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim().toLowerCase() === current.def.toLowerCase()) {
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#60a5fa', '#34d399', '#fbbf24', '#c084fc', '#f87171'],
        });
        setIndex(prev => prev + 1);
        setInput('');
      }
    }
  };

  return (
    <>
      {/* Invisible input — full power of real typing */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="fixed inset-0 opacity-0 pointer-events-none"
        autoFocus
      />

      <div className="min-h-screen flex flex-col items-center justify-center px-12 py-20 bg-black text-white">
        {/* Term Title */}
        <h1 className="text-5xl md:text-7xl font-black text-cyan-400 mb-16 tracking-tight">
          {current.term}
        </h1>

        {/* Massive Full-Width Text Display — Real MonkeyType Style */}
        <div className="w-full max-w-7xl">
          <div className="text-5xl md:text-6xl lg:text-7xl leading-tight md:leading-tight lg:leading-tight tracking-wide font-mono select-none">
            {words.map((word, wordIdx) => {
              const typedWord = userWords[wordIdx] || '';
              const isCurrentWord = wordIdx === currentWordIndex;
              const isCorrectWord = typedWord === word;
              const isWrongWord = typedWord && typedWord !== word;

              return (
                <span key={wordIdx} className="inline-block mr-4">
                  {word.split('').map((char, charIdx) => {
                    const typedChar = typedWord[charIdx] || '';
                    const isCorrectChar = typedChar === char;
                    const isExtraChar = charIdx >= word.length;

                    return (
                      <span
                        key={charIdx}
                        className={`
                          relative transition-all duration-75
                          ${wordIdx < currentWordIndex
                            ? isCorrectWord
                              ? 'text-white'
                              : 'text-red-500'
                            : isCurrentWord
                              ? isExtraChar
                                ? 'text-red-500 bg-red-500/40 rounded'
                                : isCorrectChar
                                  ? 'text-white'
                                  : typedChar
                                    ? 'text-red-500 bg-red-500/40 rounded'
                                    : 'text-gray-500'
                              : 'text-gray-500'
                          }
                          ${isCurrentWord ? 'underline decoration-4 decoration-cyan-500 underline-offset-8' : ''}
                        `}
                      >
                        {isExtraChar ? typedChar : char}
                      </span>
                    );
                  })}

                  {/* Extra characters beyond word length */}
                  {isCurrentWord && typedWord.length > word.length && (
                    <span className="text-red-500 bg-red-500/40 rounded">
                      {typedWord.slice(word.length)}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-12 text-gray-400 text-xl">
          <span>{index + 1} / {terms.length}</span>
          <span className="text-cyan-400">Press Enter to submit</span>
          <span>Perfect = Confetti</span>
        </div>
      </div>
    </>
  );
}
