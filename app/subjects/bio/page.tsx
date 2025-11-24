import Link from 'next/link'

const units = [
  { name: "Characteristics of Life", terms: 25, slug: "characteristics" },
  { name: "Cell Structure & Function", terms: 30, slug: "cell-structure" },
  { name: "Cell Membrane & Transport", terms: 28, slug: "membrane-transport" },
]

export default function Bio() {
  return (
    <main className="min-h-screen py-20 px-8">
      <h1 className="text-center text-6xl font-black text-blue mb-16">Freshman Biology Units</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {units.map(unit => (
          <Link
            key={unit.slug}
            href={`/subjects/bio/${unit.slug}`}
            className="group rounded-3xl bg-card/80 backdrop-blur-xl border border-blue/30 p-10 text-center hover:scale-105 hover:border-blue transition-all shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-blue mb-4 group-hover:text-gold transition-colors">
              {unit.name}
            </h2>
            <p className="text-xl text-muted mb-6">{unit.terms} key terms</p>
            <p className="text-2xl font-bold text-blue group-hover:text-gold transition-colors">
              Start Typing →
            </p>
          </Link>
        ))}
      </div>
    </main>
  )
}
