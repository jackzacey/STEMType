// app/components/TypingEngine.tsx
'use client';

import { useTypingTest } from './useTypingTest';
import TypingDisplay from './TypingDisplay';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const {
    currentTerm,
    chars,
    states,
    cursor,
    extra,
    isPerfect,
    termIndex,
    totalTerms,
  } = useTypingTest(terms);

  return (
    <TypingDisplay
      currentTerm={currentTerm}
      chars={chars}
      states={states}
      cursor={cursor}
      extra={extra}
      isPerfect={isPerfect}
      termIndex={termIndex}
      totalTerms={totalTerms}
    />
  );
}
