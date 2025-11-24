'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentDef = terms[index]?.def || '';

  // Split definition into words for MonkeyType-style rendering
  const words = currentDef.split(' ');
  const typedWords = input.trim().split(' ');
  const currentWordIndex = typedWords.length - 1;
  const currentTypedWord = typedWords[currentWordIndex] || '';

  useEffect(() => {
    inputRef.current?.focus();
    if (input.length === 1 && !startTime) setStartTime(Date.now());
  }, [input, startTime]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitAnswer();
    }
  };

  const submitAnswer = () => {
    const correct = input.trim().toLowerCase() === currentDef.toLowerCase();
    if (correct) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#64d2ff', '#facc15', '#3b82f6'],
      });
      setIndex(i => i + 1);
      setInput('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Term */}
      <h2 className="text-center text-5xl font-black text-blue-400 mb-12 tracking-tight">
        {terms[index]?.term}
      </h2>

      {/* MonkeyType-style text display */}
      <div className="text-2xl leading-relaxed tracking-wide font-mono mb-8 p-8 bg-[#111]/50 rounded-2xl border border-gray-800">
        {words.map((word, wordIdx) => {
          const typed = wordIdx < typedWords.length ? typedWords[wordIdx] : '';
          const isCurrentWord = wordIdx === currentWordIndex;
          const isCorrect = typed === word;
          const isWrong = typed !== '' && typed !== word;

          return (
            <span key={wordIdx} className="relative">
              {wordIdx > 0 && ' '}
              <span
                className={`
                  transition-colors duration-100
                  ${wordIdx < typedWords.length - 1 
                    ? isCorrect ? 'text-white' : 'text-red-500' 
                    : wordIdx === currentWordIndex 
                      ? isCurrentWord && currentTypedWord.length > 0
                        ? isWrong ? 'text-red-500 bg-red-500/20' : 'text-white bg-blue-500/20'
                        : 'text-gray-600'
                      : 'text-gray-600'
                  }
                  ${isCurrentWord ? 'underline decoration-4 decoration-blue-500' : ''}
                `}
              >
                {wordIdx === currentWordIndex ? (
                  <>
                    {word.split('').map((char, charIdx) => (
                      <span
                        key={charIdx}
                        className={`
                          ${charIdx < currentTypedWord.length
                            ? currentTypedWord[charIdx] === char
                              ? 'text-white'
                              : 'text-red-500 bg-red-500/30'
                            : 'text-gray-500'
                          }
                        `}
                      >
                        {char}
                      </span>
                    ))}
                    {currentTypedWord.length > word.length && (
                      <span className="text-red-500 bg-red-500/30">
                        {currentTypedWord.slice(word.length)}
                      </span>
                    )}
                  </>
                ) : (
                  word
                )}
              </span>
            </span>
          );
        })}
      </div>

      {/* Hidden textarea for input */}
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="fixed opacity-0 pointer-events-none"
        autoFocus
      />

      {/* Instructions */}
      <p className="text-center text-gray-400 text-lg">
        Start typing • Press <kbd className="px-2 py-1 bg-gray-800 rounded">Enter</kbd> to submit
      </p>
    </div>
  );
}
