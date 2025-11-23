import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-grok-black px-8 text-white">
      <h1 className="text-8xl font-bold text-neon-green animate-pulse-glow drop-shadow-lg">
        STEMType
      </h1>
      <p className="text-2xl text-center max-w-3xl opacity-90 leading-relaxed">
        Boost your typing speed while mastering high school Biology & Chemistry terms
      </p>
      <div className="flex gap-12">
        <Link
          href="/info"
          className="rounded-2xl bg-neon-green px-16 py-7 text-grok-black text-3xl font-bold hover:scale-110 transition-all duration-300 shadow-lg"
        >
          Info
        </Link>
        <Link
          href="/subjects"
          className="rounded-2xl border-4 border-neon-green px-16 py-7 text-neon-green text-3xl font-bold hover:bg-neon-green hover:text-grok-black transition-all duration-300"
        >
          Start Learning →
        </Link>
      </div>
    </main>
  );
}
