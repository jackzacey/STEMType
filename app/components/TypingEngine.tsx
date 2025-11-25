// app/components/TypingEngine.tsx
'use client';

import { useTypingTest } from './useTypingTest';
import TypingDisplay from './TypingDisplay';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const { term, chars, states, cursor, extra, isPerfect, termIndex, totalTerms } = useTypingTest(terms);

  if (!term) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-9xl md:text-[14rem] font-black text-green-400 animate-pulse text-center">
          UNIT COMPLETE! 🎉
        </div>
      </div>
    );
  }

  return (
    <TypingDisplay
      term={term}   // ← pass the whole object, not just the string
      chars={chars}
      states={states}
      cursor={cursor}
      extra={extra}
      isPerfect={isPerfect}
      termIndex={termIndex}
      totalTerms={terms.length}
    />
  );
}
