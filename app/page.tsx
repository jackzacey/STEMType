import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-8 bg-bg">
      <h1 className="text-8xl md:text-9xl font-black text-accent">STEMType</h1>
      <p className="text-2xl text-center max-w-2xl text-muted">
        Master Biology & Chemistry by typing every definition perfectly
      </p>
      <Link href="/subjects" className="rounded-xl bg-accent/10 hover:bg-accent/20 px-16 py-6 text-accent text-3xl font-semibold border border-accent/30 transition-all">
        Start Typing →
      </Link>
    </main>
  )
}
