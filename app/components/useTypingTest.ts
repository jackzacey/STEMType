// app/components/useTypingTest.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';

export type CharState = 'untyped' | 'correct' | 'incorrect';

export function useTypingTest(terms: { term: string; def: string }[]) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const [extra, setExtra] = useState('');

  const currentTerm = terms[termIndex] || { term: '', def: '' };
  const chars = currentTerm.def.split('');

  // Reset state on new term
  useEffect(() => {
    setCursor(0);
    setStates(chars.map(() => 'untyped'));
    setExtra('');
  }, [termIndex, currentTerm.def]);

  // Key handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!currentTerm.def) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        const perfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';
        if (perfect) {
          confetti({
            particleCount: 700,
            spread: 160,
            origin: { y: 0.55 },
            colors: ['#22d3ee', '#a855f7', '#f472b6', '#fbbf24', '#86efac'],
          });
          setTermIndex(i => i + 1);
        }
        return;
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        if (extra) {
          setExtra(prev => prev.slice(0, -1));
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
    },
    [chars, cursor, states, extra, currentTerm.def]
  );

  // Add event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const isPerfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return {
    term: currentTerm,
    chars,
    states,
    cursor,
    extra,
    isPerfect,
    termIndex,
    totalTerms: terms.length,
  };
}
