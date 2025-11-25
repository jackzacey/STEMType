// app/components/TypingEngine.tsx
'use client';

import { useTypingTest } from './useTypingTest';
import { HiddenInput } from './HiddenInput';
import TypingDisplay from './TypingDisplay';
import { useRef } from 'react';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { term, chars, states, cursor, extra, isPerfect, termIndex, totalTerms } = useTypingTest(terms);

  if (!term) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-9xl md:text-[14rem] font-black text-green-400 animate-pulse">
          UNIT COMPLETE! 🎉
        </div>
      </div>
    );
  }

  return (
    <>
      <HiddenInput ref={inputRef} />
      <div onClick={() => inputRef.current?.focus()} className="min-h-screen bg-black">
        <TypingDisplay
          term={term.term}
          chars={chars}
          states={states}
          cursor={cursor}
          extra={extra}
          isPerfect={isPerfect}
        />
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 text-2xl text-gray-500">
          {termIndex + 1} / {totalTerms}
        </div>
      </div>
    </>
  );
}
