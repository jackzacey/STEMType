// app/components/useTypingTest.ts
'use client';

import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

type CharState = 'untyped' | 'correct' | 'incorrect';

export function useTypingTest(terms: { term: string; def: string }[]) {
  const [termIndex, setTermIndex] = useState(0);
  const [cursor, setCursor] = useState(0);
  const [states, setStates] = useState<CharState[]>([]);
  const [extra, setExtra] = useState('');

  const currentTerm = terms[termIndex];
  const chars = currentTerm?.def.split('') || [];

  // Reset on new term
  useEffect(() => {
    setCursor(0);
    setStates(chars.map(() => 'untyped' as const));
    setExtra('');
  }, [termIndex, currentTerm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent scroll/space issues
      if ([' ', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
      }

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
          const isCorrect = e.key === chars[cursor];
          setStates(prev => {
            const next = [...prev];
            next[cursor] = isCorrect ? 'correct' : 'incorrect';
            return next;
          });
          setCursor(c => c + 1);
        } else {
          setExtra(prev => prev + e.key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cursor, states, extra, chars.length, termIndex]);

  const isPerfect = cursor === chars.length && states.every(s => s === 'correct') && extra === '';

  return {
    currentTerm,
    chars,
    states,
    cursor,
    extra,
    isPerfect,
    termIndex,
    totalTerms: terms.length,
  };
}
