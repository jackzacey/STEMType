import Link from 'next/link'

export default function Subjects() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-20 px-8 bg-bg">
      <h1 className="text-7xl font-black text-accent">Choose Your Subject</h1>
      <div className="flex gap-12">
        <Link href="/subjects/bio" className="rounded-2xl bg-accent/10 hover:bg-accent/20 px-20 py-12 text-accent text-5xl font-semibold border-2 border-accent/40 hover:border-accent transition-all">
          Biology
        </Link>
        <div className="rounded-2xl border-2 border-gold/30 px-20 py-12 text-gold text-5xl font-medium opacity-50">
          Chemistry (soon)
        </div>
      </div>
    </main>
  )
}
