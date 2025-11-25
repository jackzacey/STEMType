// app/components/TypingEngine.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const [extra, setExtra] = useState('');

  const cursorRef = useRef(0);
  const statesRef = useRef<CharState[]>([]);
  const extraRef = useRef('');
  const charsRef = useRef<string[]>([]);

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-9xl md:text-[14rem] font-black text-green-400 animate-pulse tracking-tight">
          UNIT COMPLETE! 🎉
        </div>
      </div>
    );
  }

  const chars = current.def.split('');

  // Reset everything on new term
  useEffect(() => {
    charsRef.current = chars;
    cursorRef.current = 0;
    statesRef.current = chars.map(() => 'untyped');
    extraRef.current = '';
    setCursor(0);
    setStates([...statesRef.current]);
    setExtra('');
    setTimeout(() => hiddenInputRef.current?.focus(), 10);
  }, [termIndex]);

  // Focus on click anywhere
  const focus = () => hiddenInputRef.current?.focus();

  // MAIN KEYBOARD ENGINE — MONKEYTYPE EXACT
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scroll
      if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect = cursorRef.current === charsRef.current.length &&
                        statesRef.current.every(s => s === 'correct') &&
                        extraRef.current === '';
        if (perfect) {
          confetti({
            particleCount: 600,
            spread: 170,
            origin: { y: 0.6 },
            colors: ['#22d3ee', '#a855f7', '#f472b6', '#fbbf24', '#4ade80']
          });
          setTermIndex(i => i + 1);
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (extraRef.current) {
          extraRef.current = extraRef.current.slice(0, -1);
          setExtra(extraRef.current);
        } else if (cursorRef.current > 0) {
          cursorRef.current--;
          statesRef.current[cursorRef.current] = 'untyped';
          setCursor(cursorRef.current);
          setStates([...statesRef.current]);
        }
        return;
      }

      if (e.key.length === 1) {
        e.preventDefault();
        if (cursorRef.current < charsRef.current.length) {
          const expected = charsRef.current[cursorRef.current];
          const correct = e.key === expected;
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          cursorRef.current++;
          setStates([...statesRef.current]);
          setCursor(cursorRef.current);
        } else {
          extraRef.current += e.key;
          setExtra(extraRef.current);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [termIndex]);

  const isPerfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return (
    <>
      {/* MONKEYTYPE-EXACT INVISIBLE INPUT — ZERO VISIBILITY */}
      <input
        ref={hiddenInputRef}
        type="text"
        autoFocus
        aria-hidden="true"
        className="fixed -left-[99999px] -top-[99999px] w-0 h-0 opacity-0 outline-none border-none"
        style={{ caretColor: 'transparent', pointerEvents: 'none' }}
      />

      <div
        ref={containerRef}
        className="min-h-screen bg-black flex flex-col items-center justify-center px-8 font-mono select-none"
        onClick={focus}
        tabIndex={-1}
      >
        {/* TERM — BIG AND CENTERED */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-cyan-400 mb-16 text-center tracking-tight">
          {current.term}
        </h1>

        {/* DEFINITION — PERFECTLY CENTERED, MONKEYTYPE STYLE */}
        <div className="relative">
          <div className="text-5xl md:text-7xl lg:text-8xl leading-tight text-center tracking-wider">
            {chars.map((ch, i) => (
              <span
                key={i}
                className={`relative inline-block transition-all duration-75 font-medium ${
                  states[i] === 'correct'
                    ? 'text-green-400 font-bold'
                    : states[i] === 'incorrect'
                      ? 'text-red-500 font-bold underline decoration-2 decoration-red-500/70'
                      : 'text-gray-300'
                }`}
              >
                {ch === ' ' ? '\u00A0' : ch}
                {i === cursor && (
                  <span className="absolute inset-0 w-0.5 bg-cyan-400 animate-pulse ml-1" />
                )}
              </span>
            ))}
            {extra.split('').map((ch, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/20 px-1 rounded font-bold">
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* FEEDBACK — HUGE AND CENTERED */}
        <div className="mt-20 text-5xl md:text-7xl font-black text-center">
          <span className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
            {isPerfect ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>

        {/* PROGRESS */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 text-xl text-gray-500">
          {termIndex + 1} / {terms.length}
        </div>
      </div>
    </>
  );
}
