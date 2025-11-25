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

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1724]">
        <div className="text-9xl md:text-10xl font-black text-green-400 tracking-tight text-center animate-pulse">
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
  }, [termIndex]);

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const focusInput = () => hiddenInputRef.current?.focus();

  useEffect(() => {
    focusInput();
  }, [termIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key.startsWith('Arrow')) e.preventDefault();

      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect = cursorRef.current === chars.length && statesRef.current.every(s => s === 'correct') && extraRef.current === '';
        if (perfect) {
          confetti({ particleCount: 400, spread: 120, origin: { y: 0.6 } });
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

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [termIndex]);

  const isPerfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return (
    <>
      {/* TEXTBOX IS DEAD — OFF-SCREEN, NO CARET, NO FLASH */}
      <input
        ref={hiddenInputRef}
        type="text"
        autoFocus
        aria-hidden
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 outline-none border-none"
        style={{ caretColor: 'transparent', pointerEvents: 'none' }}
      />

      {/* FULL SCREEN CENTERED LAYOUT */}
      <div
        className="min-h-screen bg-[#0f1724] flex flex-col items-center justify-center px-8 text-white font-mono select-none"
        onClick={focusInput}
      >
        {/* Term — perfectly centered */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-cyan-400 mb-20 tracking-tight text-center">
          {current.term}
        </h1>

        {/* Definition text — perfectly centered */}
        <div className="relative max-w-6xl w-full">
          <div
            className="text-5xl md:text-7xl lg:text-8xl leading-snug text-center tracking-wider"
            style={{ fontFamily: '"Roboto Mono", ui-monospace, monospace', letterSpacing: '0.04em' }}
          >
            {chars.map((ch, i) => (
              <span
                key={i}
                className={`relative inline-block transition-colors duration-100 ${
                  states[i] === 'correct' ? 'text-white' :
                  states[i] === 'incorrect' ? 'text-red-500' :
                  'text-gray-500 opacity-40'
                }`}
              >
                {ch === ' ' ? '\u00A0' : ch}
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

        {/* Bottom feedback — centered, big, beautiful */}
        <div className="mt-24 text-4xl md:text-6xl text-center">
          <span className={isPerfect ? 'text-green-400 font-bold' : 'text-cyan-400'}>
            {isPerfect ? 'Press Enter →' : 'Keep typing'}
          </span>
        </div>

        {/* Progress */}
        <div className="fixed bottom-10 text-xl text-gray-500">
          {termIndex + 1} / {terms.length}
        </div>
      </div>
    </>
  );
}
