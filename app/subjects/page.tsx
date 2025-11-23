import Link from 'next/link';

export default function Subjects() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-16 bg-bg-navy px-8 text-white">
      <h1 className="text-7xl font-bold text-blue-primary animate-pulse-glow drop-shadow-lg">
        Choose Your Subject
      </h1>
      <div className="flex gap-16">
        <Link
          href="/subjects/bio"
          className="rounded-2xl bg-blue-primary px-20 py-10 text-bg-navy text-4xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl"
        >
          Biology
        </Link>
        <Link
          href="/subjects/chem"
          className="rounded-2xl border-4 border-gold-accent px-20 py-10 text-gold-accent text-4xl font-bold hover:bg-gold-accent hover:text-bg-navy transition-all duration-300 shadow-2xl"
        >
          Chemistry (coming)
        </Link>
      </div>
    </main>
  );
}
