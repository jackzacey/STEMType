'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = terms[index];
  if (!current) return <div className="text-6xl text-green-400">All Done! 🎉</div>;

  const words = current.def.split(' ');
  const typedWords = input.trim().split(' ');
  const currentWordIndex = typedWords.length - 1;

  useEffect(() => {
    inputRef.current?.focus();
    if (input.length === 1 && !startTime) setStartTime(Date.now());
  }, [input, startTime]);

  const handleSubmit = () => {
    if (input.trim().toLowerCase() === current.def.toLowerCase()) {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#60a5fa', '#34d399', '#facc15', '#a78bfa'],
      });
      setIndex(i => i + 1);
      setInput('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8">
      {/* Term */}
      <h2 className="text-5xl md:text-6xl font-bold text-blue-400 mb-12 tracking-tight">
        {current.term}
      </h2>

      {/* Massive typing area - real MonkeyType style */}
      <div className="w-full max-w-5xl">
        <div className="text-4xl md:text-5xl leading-relaxed tracking-wider font-mono select-none">
          {words.map((word, i) => {
            const typed = typedWords[i] || '';
            const isCurrent = i === currentWordIndex;
            const isCorrect = typed === word;
            const isWrong = typed && typed !== word;

            return (
              <span key={i} className="inline-block mr-3">
                {word.split('').map((char, j) => {
                  const typedChar = typed[j] || '';
                  const isCorrectChar = typedChar === char;
                  const isExtra = j >= word.length;

                  return (
                    <span
                      key={j}
                      className={`
                        transition-all duration-75
                        ${i < currentWordIndex 
                          ? isCorrect ? 'text-white' : 'text-red-500'
                          : i === currentWordIndex
                            ? isExtra ? 'text-red-500 bg-red-500/30'
                            : isCorrectChar ? 'text-white'
                            : typedChar ? 'text-red-500 bg-red-500/30'
                            : 'text-gray-600'
                        : 'text-gray-600'
                        }
                        ${isCurrent ? 'underline decoration-4 decoration-blue-500' : ''}
                      `}
                    >
                      {isExtra ? typedChar : char}
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

        {/* Hidden input + real input visual */}
        <div className="mt-12 h-20 border-b-4 border-gray-700 flex items-end">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            className="w-full bg-transparent text-5xl text-white outline-none caret-blue-500 font-mono"
            placeholder="Start typing..."
            autoFocus
          />
        </div>

        <p className="mt-8 text-center text-gray-500 text-lg">
          Press <kbd className="px-3 py-1 bg-gray-800 rounded text-white">Enter</kbd> to submit • Perfect answer = confetti
        </p>
      </div>

      {/* Progress */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-gray-500">
        {index + 1} / {terms.length}
      </div>
    </div>
  );
}
