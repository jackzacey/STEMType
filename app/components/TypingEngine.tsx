// app/components/TypingEngine.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [termIndex, setTermIndex] = useState(0);

  // UI state that forces re-render when changed
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const [extra, setExtra] = useState('');

  // Refs for always-current values (used inside event listeners)
  const cursorRef = useRef(0);
  const statesRef = useRef<CharState[]>([]);
  const extraRef = useRef('');
  const charsRef = useRef<string[]>([]);
  const composingRef = useRef(false);

  const current = terms[termIndex];
  if (!current) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f1724] text-6xl md:text-9xl font-bold text-green-400">
        UNIT COMPLETE! 🎉
      </div>
    );
  }

  // initialize charsRef and visual state on term change
  useEffect(() => {
    const chars = current.def.split('');
    charsRef.current = chars;
    cursorRef.current = 0;
    statesRef.current = chars.map(() => 'untyped' as CharState);
    extraRef.current = '';
    setCursor(0);
    setStates([...statesRef.current]);
    setExtra('');
    // focus the hidden input via a tiny timeout (helps in some browsers)
    setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 0);
  }, [termIndex, current.def]);

  // hidden input ref (focus-stealer only)
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  // utility to focus the input
  const focusInput = () => {
    try {
      hiddenInputRef.current?.focus();
    } catch {
      /* ignore */
    }
  };

  // Attach keyboard & composition listeners once (handlers use refs)
  useEffect(() => {
    const charsGetter = () => charsRef.current;
    const handleKeyDown = (e: KeyboardEvent) => {
      // If IME composition is active, ignore keydown events (compositionend will handle)
      if (composingRef.current) return;

      // Prevent page scrolling/arrow defaults for keys we use
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }

      // Enter: only progress if perfect (no extra and all correct)
      if (e.key === 'Enter') {
        e.preventDefault();
        const finished = cursorRef.current === charsGetter().length &&
                         statesRef.current.every(s => s === 'correct') &&
                         extraRef.current === '';
        if (finished) {
          confetti({ particleCount: 300, spread: 120, origin: { y: 0.55 } });
          setTermIndex(i => i + 1);
        }
        return;
      }

      // Backspace: remove extras first, otherwise rewind one char and mark untyped
      if (e.key === 'Backspace') {
        e.preventDefault();
        if (extraRef.current.length > 0) {
          extraRef.current = extraRef.current.slice(0, -1);
          setExtra(extraRef.current);
        } else if (cursorRef.current > 0) {
          cursorRef.current -= 1;
          statesRef.current[cursorRef.current] = 'untyped';
          setCursor(cursorRef.current);
          setStates([...statesRef.current]);
        }
        return;
      }

      // Printable characters (length === 1)
      if (e.key.length === 1) {
        e.preventDefault();
        const chars = charsGetter();
        if (cursorRef.current < chars.length) {
          const expected = chars[cursorRef.current];
          const correct = e.key === expected;
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          setStates([...statesRef.current]);
          cursorRef.current += 1;
          setCursor(cursorRef.current);
        } else {
          // beyond end: collect "extra" typed chars
          extraRef.current += e.key;
          setExtra(extraRef.current);
        }
      }
    };

    // Composition (IME) handling — compositionstart/compositionend are proper DOM events.
    const handleCompositionStart = () => {
      composingRef.current = true;
    };
    const handleCompositionEnd = (e: CompositionEvent) => {
      composingRef.current = false;
      // e.data contains the composed characters (string)
      const text = (e.data ?? '') as string;
      const chars = charsGetter();
      for (const ch of text) {
        if (cursorRef.current < chars.length) {
          const correct = ch === chars[cursorRef.current];
          statesRef.current[cursorRef.current] = correct ? 'correct' : 'incorrect';
          cursorRef.current += 1;
        } else {
          extraRef.current += ch;
        }
      }
      setStates([...statesRef.current]);
      setCursor(cursorRef.current);
      setExtra(extraRef.current);
    };

    // Keep window listeners so the engine works even if the hidden input loses actual focus
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('compositionstart', handleCompositionStart);
    window.addEventListener('compositionend', handleCompositionEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('compositionstart', handleCompositionStart);
      window.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, []); // run once on mount

  const isPerfect = cursor === charsRef.current.length && states.every(s => s === 'correct') && extra === '';

  return (
    <>
      {/* Invisible focus-stealer ONLY. No pointer-events-none. caret hidden. */}
      <input
        ref={hiddenInputRef}
        type="text"
        aria-hidden
        autoFocus
        className="fixed inset-0 opacity-0 outline-none caret-transparent"
        onFocus={() => {
          /* nothing else — keyboard events handled on window */
        }}
      />

      <div
        className="flex min-h-screen flex-col items-center justify-center bg-[#0f1724] px-6 md:px-8 font-mono text-white select-none"
        onClick={focusInput}
      >
        {/* Term */}
        <h1 className="mb-20 text-5xl md:text-7xl lg:text-8xl font-extrabold text-cyan-400 tracking-tight text-center">
          {current.term}
        </h1>

        {/* MonkeyType text area */}
        <div className="relative w-full max-w-6xl">
          <div
            className="text-center text-4xl md:text-6xl lg:text-7xl leading-snug tracking-wide"
            style={{
              fontFamily: '"Roboto Mono", ui-monospace, monospace',
              letterSpacing: '0.02em',
              lineHeight: 1.4,
            }}
          >
            {charsRef.current.map((ch, i) => {
              const st = states[i] ?? 'untyped';
              const cls =
                st === 'correct' ? 'text-white' :
                st === 'incorrect' ? 'text-red-500' :
                'text-gray-400 opacity-40'; // dimmed untyped

              return (
                <span key={i} className={`relative inline-block transition-colors duration-75 ${cls}`}>
                  {ch === ' ' ? '\u00A0' : ch}
                  {i === cursor && (
                    <span className="absolute -left-1 top-0 h-full w-1.5 bg-cyan-400 animate-pulse" />
                  )}
                </span>
              );
            })}

            {/* Extra typed characters (beyond expected length) */}
            {extra.split('').map((ch, i) => (
              <span key={`extra-${i}`} className="text-red-400 bg-red-500/10 inline-block">
                {ch}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="fixed bottom-10 md:bottom-12 left-0 right-0 flex justify-center gap-10 text-lg md:text-xl text-gray-400">
          <div>{termIndex + 1} / {terms.length}</div>
          <div className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
            {isPerfect ? 'Press Enter →' : 'Keep typing'}
          </div>
        </div>
      </div>
    </>
  );
}
