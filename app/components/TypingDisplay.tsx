// app/components/TypingDisplay.tsx
'use client';

type Props = {
  term: string;
  chars: string[];
  states: ('untyped' | 'correct' | 'incorrect')[];
  [];
  cursor: number;
  extra: string;
  isPerfect: boolean;
};

export default function TypingDisplay({ term, chars, states, cursor, extra, isPerfect }: Props) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 font-mono select-none">
      <h1 className="text-7xl md:text-9xl lg:text-10xl font-black text-cyan-400 mb-20 text-center tracking-tight">
        {term}
      </h1>

      <div className="relative max-w-7xl">
        <div className="text-6xl md:text-8xl lg:text-9xl leading-tight text-center tracking-wider">
          {chars.map((ch, i) => (
            <span
              key={i}
              className={`relative inline-block font-bold transition-all duration-100 ${
                states[i] === 'correct'
                  ? 'text-green-400'
                  : states[i] === 'incorrect'
                    ? 'text-red-500 underline decoration-red-500/70'
                    : 'text-gray-300'
              }`}
            >
              {ch === ' ' ? '\u00A0' : ch}
              {i === cursor && (
                <span className="absolute left-0 top-0 h-full w-1 bg-cyan-400 animate-pulse" />
              )}
            </span>
          ))}
          {extra.split('').map((ch, i) => (
            <span key={`extra-${i}`} className="text-red-500 bg-red-600/30 px-1.5 rounded font-bold">
              {ch}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-24 text-6xl md:text-8xl font-black">
        <span className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
          {isPerfect ? 'Press Enter →' : 'Keep typing'}
        </span>
      </div>
    </div>
  );
}
