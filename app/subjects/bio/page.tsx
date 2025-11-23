import Link from 'next/link';

const units = [
  { name: "Characteristics of Life", terms: 25, slug: "characteristics" },
  { name: "Cell Structure & Function", terms: 30, slug: "cell-structure" },
  { name: "Cell Membrane & Transport", terms: 28, slug: "membrane-transport" },
  // Add more as we go — full 10+ units for freshman Bio
];

export default function Bio() {
  return (
    <main className="min-h-screen bg-bg-navy px-8 py-16 text-white">
      <h1 className="text-6xl font-bold text-blue-primary animate-pulse-glow text-center mb-12">
        Freshman Biology Units
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {units.map((unit) => (
          <Link
            key={unit.slug}
            href={`/subjects/bio/${unit.slug}`}
            className="rounded-2xl border-4 border-blue-primary/50 p-8 text-center hover:scale-105 hover:border-blue-primary transition-all duration-300 shadow-xl bg-card backdrop-blur-sm"
          >
            <h2 className="text-3xl font-bold text-blue-primary mb-4">{unit.name}</h2>
            <p className="text-xl opacity-90">{unit.terms} key terms</p>
            <p className="mt-6 text-blue-primary font-bold">Start Typing →</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
