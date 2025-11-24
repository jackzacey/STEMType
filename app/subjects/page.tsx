import Link from 'next/link';

export default function Subjects() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-bg px-8 text-text">
      <h1 className="text-7xl font-bold text-blue animate-pulse-slow drop-shadow-2xl">Choose Your Subject</h1>
      <div className="flex gap-16">
        <Link href="/subjects/bio" className="rounded-2xl bg-blue px-24 py-12 text-bg text-5xl font-bold hover:scale-110 transition-all shadow-2xl">
          Biology
        </Link>
        <Link href="/subjects/chem" className="rounded-2xl border-4 border-gold px-24 py-12 text-gold text-5xl font-bold hover:bg-gold hover:text-bg transition-all shadow-2xl">
          Chemistry (soon)
        </Link>
      </div>
    </main>
  );
}
