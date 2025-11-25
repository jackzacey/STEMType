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
  const focus = () => hiddenInputRef.current?.focus();

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1724]">
        <div className="text-9xl md:text-[14rem] font-black text-green-400 animate-pulse tracking-tight text-center">
          UNIT COMPLETE! 🎉
        </div>
      </div>
    );
  }

  const chars = current.def.split('');

  useEffect(() => {
    charsRef.current = chars;
    cursorRef.current = 0;
    statesRef.current = chars.map(() => 'untyped');
    extraRef.current = '';
    setCursor(0);
    setStates([...statesRef.current]);
    setExtra('');
    setTimeout(focus, 0);
  }, [termIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect = cursorRef.current === charsRef.current.length &&
                        statesRef.current.every(s => s === 'correct') &&
                        extraRef.current === '';
        if (perfect) {
          confetti({ particleCount: 600, spread: 160, origin: { y: 0.55 } });
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
          const correct = e.key === charsRef.current[cursorRef.current];
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
      {/* INVISIBLE INPUT — GONE FROM EXISTENCE */}
      <input
        ref={hiddenInputRef}
        type="text"
        autoFocus
        aria-hidden
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 outline-none border-none"
        style={{ caretColor: 'transparent', pointerEvents: 'none' }}
      />

      <div
        className="min-h-screen bg-[#0f1724] flex flex-col items-center justify-center px-8 text-white font-mono select-none"
        onClick={focus}
      >
        <h1 className="text-7xl md:text-9xl lg:text-10xl font-black text-cyan-400 mb-24 tracking-tight text-center">
          {current.term}
        </h1>

        <div className="relative max-w-7xl">
          <div
            className="text-6xl md:text-8xl lg:text-9xl leading-snug text-center tracking-wider"
            style={{ fontFamily: '"Roboto Mono", ui-monospace, monospace', letterSpacing: '0.05em' }}
          >
            {chars.map((ch, i) => (
              <span
                key={i}
                className={`relative inline-block transition-all duration-150 font-bold ${
                  states[i] === 'correct'
                    ? 'text-green-400 drop-shadow-lg'
                    : states[i] === 'incorrect'
                      ? 'text-red-500'
                      : 'text-gray-300'
                }`}
              >
                {ch === ' ' ? '\u00A0' : ch}
                {i === cursor && (
                  <span className="absolute -left-1 top-0 h-full w-2 bg-cyan-400 animate-pulse shadow-cyan" />
                )}
              </span>
            ))}
            {extra.split('').map((ch, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/30 px-2 rounded font-bold">
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-32 text-5xl md:text-7xl lg:text-8xl font-black text-center">
          <span className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
            {isPerfect ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>

        <div className="fixed bottom-12 text-2xl text-gray-400">
          {termIndex + 1} / {terms.length}
        </div>
      </div>
    </>
  );
}
