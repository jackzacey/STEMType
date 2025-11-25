// app/components/TypingDisplay.tsx
'use client';

type Props = {
  currentTerm: { term: string; def: string } | undefined;
  chars: string[];
  states: ('untyped' | 'correct' | 'incorrect')[];
  cursor: number;
  extra: string;
  isPerfect: boolean;
  termIndex: number;
  totalTerms: number;
};

const getCharClass = (state: 'untyped' | 'correct' | 'incorrect') => {
  switch (state) {
    case 'correct':   return 'text-green-400 font-bold drop-shadow-lg';
    case 'incorrect': return 'text-red-500 font-bold underline decoration-red-500/70 decoration-2';
    case 'untyped':   return 'text-gray-300';
  }
};

export default function TypingDisplay({
  currentTerm,
  chars,
  states,
  cursor,
  extra,
  isPerfect,
  termIndex,
  totalTerms,
}: Props) {
  if (!currentTerm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-9xl md:text-[14rem] font-black text-green-400 animate-pulse">
          UNIT COMPLETE! 🎉
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 font-mono select-none">
      <h1 className="text-7xl md:text-9xl lg:text-10xl font-black text-cyan-400 mb-20 text-center tracking-tight">
        {currentTerm.term}
      </h1>

      <div className="relative max-w-7xl">
        <div className="text-6xl md:text-8xl lg:text-9xl leading-tight text-center tracking-wider">
          {chars.map((ch, i) => (
            <span
              key={i}
              className={`relative inline-block transition-all duration-100 ${getCharClass(states[i])}`}
            >
              {ch === ' ' ? '\u00A0' : ch}
              {i === cursor && (
                <span className="absolute left-0 top-0 h-full w-1.5 bg-cyan-400 animate-pulse shadow-cyan" />
              )}
            </span>
          ))}

          {extra.split('').map((ch, i) => (
            <span
              key={`extra-${i}`}
              className="text-red-500 bg-red-600/40 px-2 rounded font-bold animate-pulse"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-32 text-6xl md:text-8xl font-black">
        <span className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
          {isPerfect ? 'Press Enter →' : 'Keep typing'}
        </span>
      </div>

      <div className="fixed bottom-12 text-xl text-gray-500">
        {termIndex + 1} / {totalTerms}
      </div>
    </div>
  );
}
