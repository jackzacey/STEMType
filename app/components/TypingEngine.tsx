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

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1724]">
        <div className="text-9xl md:text-[10rem] font-black text-green-400 tracking-tight text-center animate-pulse">
          UNIT COMPLETE! 🎉
        </div>
      </div>
    );
  }

  const chars = current.def.split('');

  // Reset on new term
  useEffect(() => {
    cursorRef.current = 0;
    statesRef.current = chars.map(() => 'untyped');
    extraRef.current = '';
    setCursor(0);
    setStates([...statesRef.current]);
    setExtra('');
  }, [termIndex]);

  // Hidden input to capture keyboard
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => hiddenInputRef.current?.focus();
  useEffect(() => {
    focusInput();
  }, [termIndex]);

  // Handle typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      // ENTER → complete only if perfect
      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect =
          cursorRef.current === chars.length &&
          statesRef.current.every(s => s === 'correct') &&
          extraRef.current === '';
        if (perfect) {
          confetti({ particleCount: 400, spread: 120, origin: { y: 0.55 } });
          setTermIndex(i => i + 1);
        }
        return;
      }

      // BACKSPACE
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

      // Normal character
      if (e.key.length === 1) {
        e.preventDefault();
        if (cursorRef.current < chars.length) {
          const correct = e.key === charsRef.current[cursorRef.current];
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          cursorRef.current++;
          setCursor(cursorRef.current);
          setStates([...statesRef.current]);
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
      {/* HIDDEN INPUT — completely offscreen */}
      <input
        ref={hiddenInputRef}
        type="text"
        autoFocus
        aria-hidden
        className="fixed top-[-9999px] left-[-9999px] w-0 h-0 opacity-0 outline-none border-none"
        style={{ caretColor: 'transparent', pointerEvents: 'none', userSelect: 'none' }}
      />

      <div
        className="min-h-screen bg-[#0f1724] flex flex-col items-center justify-center px-8 text-white font-mono select-none cursor-default"
        onClick={focusInput}
      >
        {/* Term */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-cyan-400 mb-20 tracking-tight text-center">
          {current.term}
        </h1>

        {/* Definition text */}
        <div className="relative max-w-6xl w-full">
          <div
            className="text-5xl md:text-7xl lg:text-8xl leading-snug text-center tracking-wider"
            style={{ fontFamily: '"Roboto Mono", ui-monospace, monospace', letterSpacing: '0.04em' }}
          >
            {chars.map((ch, i) => (
              <span
                key={i}
                className={`relative inline-block transition-colors duration-150 ${
                  states[i] === 'correct'
                    ? 'text-white'
                    : states[i] === 'incorrect'
                    ? 'text-red-500'
                    : 'text-gray-400 opacity-50'
                }`}
              >
                {ch === ' ' ? '\u00A0' : ch}
                {i === cursor && (
                  <span className="absolute -left-1 top-0 h-full w-1.5 bg-cyan-400 animate-pulse" />
                )}
              </span>
            ))}

            {extra.split('').map((ch, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/20 rounded-sm">
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-24 text-4xl md:text-6xl text-center">
          <span className={isPerfect ? 'text-green-400 font-bold' : 'text-cyan-400 font-semibold'}>
            {isPerfect ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>

        {/* Progress */}
        <div className="fixed bottom-10 text-xl text-gray-400 text-center w-full">
          {termIndex + 1} / {terms.length}
        </div>
      </div>
    </>
  );
}
