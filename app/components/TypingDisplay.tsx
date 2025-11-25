// app/components/TypingDisplay.tsx
'use client';

type Props = {
  term: string;
  chars: string[];
  states: ('untyped' | 'correct' | 'incorrect')[];
  cursor: number;
  extra: string;
  isPerfect: boolean;
};

export default function TypingDisplay({ term, chars, states, cursor, extra, isPerfect }: Props) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-8 font-mono select-none">
      {/* TERM — HUGE AND GORGEOUS */}
      <h1 className="text-7xl md:text-9xl lg:text-10xl font-black text-cyan-400 mb-20 text-center tracking-tight">
        {term}
      </h1>

      {/* DEFINITION + COLORS + CURSOR */}
      <div className="relative max-w-7xl">
        <div className="text-6xl md:text-8xl lg:text-9xl leading-tight text-center tracking-wider">
          {chars.map((ch, i) => (
            <span
              key={i}
              className={`relative inline-block font-bold transition-all duration-100 ${
                states[i] === 'correct'
                  ? 'text-green-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                  : states[i] === 'incorrect'
                    ? 'text-red-500 underline decoration-red-500/70 decoration-2'
                    : 'text-gray-400 opacity-50'
              }`}
            >
              {ch === ' ' ? '\u00A0' : ch}
              {/* BLINKING CURSOR */}
              {i === cursor && (
                <span className="absolute left-0 top-0 h-full w-1.5 bg-cyan-400 animate-pulse shadow-lg" />
              )}
            </span>
          ))}

          {/* EXTRA CHARACTERS — RED WITH BACKGROUND */}
          {extra.split('').map((ch, i) => (
            <span
              key={`extra-${i}`}
              className="text-red-500 bg-red-600/40 px-2 py-1 rounded font-bold animate-pulse"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* FEEDBACK — MASSIVE */}
      <div className="mt-32 text-6xl md:text-8xl font-black text-center">
        <span className={isPerfect ? 'text-green-400' : 'text-cyan-400'}>
          {isPerfect ? 'Press Enter →' : 'Keep typing'}
        </span>
      </div>
    </div>
  );
}
