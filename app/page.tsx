import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 px-8 bg-[#0a0a0a]">
      <h1 className="text-8xl md:text-9xl font-black text-[#64d2ff] drop-shadow-2xl animate-pulse">
        STEMType
      </h1>
      <p className="text-2xl text-center max-w-2xl text-[#94a3b8]">
        Master Biology & Chemistry by typing every definition perfectly
      </p>
      <Link href="/subjects" className="rounded-2xl bg-[#64d2ff] px-16 py-6 text-[#0a0a0a] text-3xl font-bold hover:scale-105 transition-all shadow-2xl">
        Start Typing →
      </Link>
    </main>
  )
}
