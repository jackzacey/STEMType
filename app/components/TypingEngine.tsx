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
      <div className="flex min-h-screen items-center justify-center bg-[#1e1e1e] text-9xl font-bold text-green-400">
        UNIT COMPLETE! 🎉
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
    setStates([...statesRef.current]); // Clone to force re-render
    setExtra('');
  }, [termIndex]);

  const inputRef = useRef<HTMLInputElement>(null);

  const refocus = () => inputRef.current?.focus();
  useEffect(refocus, [termIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect =
          cursorRef.current === chars.length &&
          statesRef.current.every(s => s === 'correct') &&
          extraRef.current === '';
        if (perfect) {
          confetti({ particleCount: 400, spread: 130, origin: { y: 0.55 } });
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

        if (cursorRef.current < chars.length) {
          const correct = e.key === chars[cursorRef.current];
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

    // FIXED IME HANDLING — FULLY TYPED & WORKING
    const handleCompositionStart = (e: CompositionEvent) => {
      e.preventDefault();
    };

    const handleCompositionEnd = (e: CompositionEvent) => {
      const text = e.data || '';
      for (const ch of text) {
        if (cursorRef.current < chars.length) {
          const correct = ch === chars[cursorRef.current];
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          cursorRef.current++;
        } else {
          extraRef.current += ch;
        }
      }
      setStates([...statesRef.current]);
      setCursor(cursorRef.current);
      setExtra(extraRef.current);
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

  const isPerfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return (
    <>
      {/* INVISIBLE INPUT — OFF-SCREEN, NO FLASHING CARET */}
      <input
        ref={inputRef}
        type="text"
        className="fixed -top-[9999px] left-0 opacity-0 outline-none caret-transparent"
        autoFocus
        onClick={refocus}
      />

      <div
        className="flex min-h-screen flex-col items-center justify-center bg-[#1e1e1e] px-8 font-mono text-white select-none cursor-default"
        onClick={refocus}
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

            {extra.split('').map((ch, i) => (
              <span key={`extra-${i}`} className="text-red-500 bg-red-500/20">
                {ch}
              </span>
            ))}
          </div>
        </div>

        <div className="fixed bottom-12 flex gap-16 text-2xl text-gray-400">
          <span>{termIndex + 1} / {terms.length}</span>
          <span className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
            {isPerfect ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>
      </div>
    </>
  );
}
