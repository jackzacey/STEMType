// app/components/TypingEngine.tsx
'use client';

import { useTypingTest } from './useTypingTest';
import TypingDisplay from './TypingDisplay';
import { HiddenInput } from './HiddenInput';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const {
    term,
    chars,
    states,
    cursor,
    extra,
    isPerfect,
    termIndex,
    totalTerms,
    focus,
    focusRef,
  } = useTypingTest(terms);

  if (!term) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-green-400">
      <div className="text-9xl md:text-[14rem] font-black animate-pulse">UNIT COMPLETE! 🎉</div>
    </div>;
  }

  return (
    <>
      <HiddenInput ref={focusRef} />
      <div onClick={focus} className="cursor-text">
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
