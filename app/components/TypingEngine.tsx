'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const [extra, setExtra] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);

  // Refs to avoid stale closures
  const cursorRef = useRef(0);
  const statesRef = useRef<CharState[]>([]);
  const extraRef = useRef('');

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
    cursorRef.current = 0;
    setCursor(0);
    statesRef.current = chars.map(() => 'untyped');
    setStates(statesRef.current);
    setExtra('');
    extraRef.current = '';
  }, [termIndex]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Steal focus
  useEffect(() => {
    inputRef.current?.focus();
  }, [termIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComposing) return;

      // Prevent scroll, selection, etc.
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const finished = cursorRef.current === chars.length && 
                        statesRef.current.every(s => s === 'correct') && 
                        extraRef.current === '';
        if (finished) {
          confetti({ particleCount: 400, spread: 130, origin: { y: 0.55 } });
          setTermIndex(i => i + 1);
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (extraRef.current) {
          setExtra(prev => prev.slice(0, -1));
          extraRef.current = extraRef.current.slice(0, -1);
        } else if (cursorRef.current > 0) {
          cursorRef.current--;
          setCursor(cursorRef.current);
          statesRef.current[cursorRef.current] = 'untyped';
          setStates([...statesRef.current]);
        }
        return;
      }

      // Printable character
      if (e.key.length === 1) {
        e.preventDefault();

        if (cursorRef.current < chars.length) {
          const correct = e.key === chars[cursorRef.current];
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          setStates([...statesRef.current]);
          cursorRef.current++;
          setCursor(cursorRef.current);
        } else {
          // Extra characters
          setExtra(prev => prev + e.key);
          extraRef.current += e.key;
        }
      }
    };

    const handleCompositionStart = () => setIsComposing(true);
    const handleCompositionEnd = (e: any) => {
      setIsComposing(false);
      // IME finished — treat as normal input
      if (cursorRef.current < chars.length) {
        const text = e.data;
        for (const char of text) {
          if (cursorRef.current >= chars.length) break;
          const correct = char === chars[cursorRef.current];
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          cursorRef.current++;
        }
        setStates([...statesRef.current]);
        setCursor(cursorRef.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('compositionstart', handleCompositionStart);
    window.addEventListener('compositionend', handleCompositionEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('compositionstart', handleCompositionStart);
      window.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [termIndex]);

  const isComplete = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return (
    <>
      {/* Invisible focus-stealer — clickable, focusable, no pointer-events-none */}
      <input
        ref={inputRef}
        type="text"
        className="fixed inset-0 opacity-0 caret-transparent"
        autoFocus
        onFocus={() => inputRef.current?.focus()}
      />

      <div 
        className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono text-white select-none"
        onClick={() => inputRef.current?.focus()}
      >
        <h1 className="mb-20 text-6xl font-black text-cyan-400 md:text-8xl tracking-tight">
          {current.term}
        </h1>

        <div className="relative max-w-7xl">
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
                className={`relative inline-block transition-colors duration-100 ${
                  states[i] === 'correct'
                    ? 'text-white'
                    : states[i] === 'incorrect'
                      ? 'text-red-500'
                      : 'text-gray-500 opacity-40'
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
                {i === cursor && (
                  <span className="absolute -left-1 top-0 h-full w-1.5 bg-cyan-400 animate-pulse" />
                )}
              </span>
            ))}

            {/* Extra characters */}
            {extra.split('').map((char, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/20">
                {char}
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
