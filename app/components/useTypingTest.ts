// app/components/useTypingTest.ts
'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export function useTypingTest(terms: { term: string; def: string }[]) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<('untyped' | 'correct' | 'incorrect')[]>([]);
  const [extra, setExtra] = useState('');

  const current = terms[termIndex];
  const chars = current?.def.split('') || [];

  useEffect(() => {
    setCursor(0);
    setStates(chars.map(() => 'untyped'));
    setExtra('');
  }, [termIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (cursor === chars.length && states.every(s => s === 'correct') && extra === '') {
        confetti({ particleCount: 800, spread: 180, origin: { y: 0.55 } });
        setTermIndex(i => i + 1);
      }
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (extra) {
        setExtra(extra.slice(0, -1));
      } else if (cursor > 0) {
        setStates(prev => {
          const next = [...prev];
          next[cursor - 1] = 'untyped';
          return next;
        });
        setCursor(c => c - 1);
      }
      return;
    }

    if (e.key.length === 1) {
      e.preventDefault();
      if (cursor < chars.length) {
        const correct = e.key === chars[cursor];
        setStates(prev => {
          const next = [...prev];
          next[cursor] = correct ? 'correct' : 'incorrect';
          return next;
        });
        setCursor(c => c + 1);
      } else {
        setExtra(prev => prev + e.key);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursor, states, extra, termIndex]);

  const isPerfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return {
    term: current,
    chars,
    states,
    cursor,
    extra,
    isPerfect,
    termIndex,
    totalTerms: terms.length,
    handleKeyDown,
  };
}
