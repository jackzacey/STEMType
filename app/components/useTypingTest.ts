// app/components/useTypingTest.ts
'use client';

import { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export function useTypingTest(terms: { term: string; def: string }[]) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const [extra, setExtra] = useState('');

  const cursorRef = useRef(0);
  const statesRef = useRef<CharState[]>([]);
  const extraRef = useRef('');
  const charsRef = useRef<string[]>([]);

  const currentDef = terms[termIndex]?.def || '';
  const chars = currentDef.split('');

  // Reset on new term
  useEffect(() => {
    charsRef.current = chars;
    cursorRef.current = 0;
    statesRef.current = chars.map(() => 'untyped');
    extraRef.current = '';
    setCursor(0);
    setStates([...statesRef.current]);
    setExtra('');
  }, [termIndex, currentDef]);

  const focusRef = useRef<HTMLInputElement>(null);
  const focus = () => focusRef.current?.focus();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect = cursorRef.current === charsRef.current.length &&
                        statesRef.current.every(s => s === 'correct') &&
                        extraRef.current === '';
        if (perfect) {
          confetti({
            particleCount: 700,
            spread: 180,
            origin: { y: 0.55 },
            colors: ['#22d3ee', '#a855f7', '#f472b6', '#fbbf24', '#86efac']
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

  return {
    term: terms[termIndex],
    chars,
    states,
    cursor,
    extra,
    isPerfect,
    termIndex,
    totalTerms: terms.length,
    focus,
    focusRef,
    nextTerm: () => setTermIndex(i => i + 1),
  };
}
