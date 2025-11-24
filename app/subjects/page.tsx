import Link from 'next/link'

export default function Subjects() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-20 px-8 bg-[#0a0a0a]">
      <h1 className="text-7xl font-black text-[#64d2ff]">Choose Your Subject</h1>
      <div className="flex gap-12">
        <Link href="/subjects/bio" className="rounded-3xl bg-[#64d2ff] px-20 py-12 text-[#0a0a0a] text-5xl font-bold hover:scale-110 transition-all shadow-2xl">
          Biology
        </Link>
        <div className="rounded-3xl border-4 border-[#facc15]/50 px-20 py-12 text-[#facc15] text-5xl font-bold opacity-60">
          Chemistry (soon)
        </div>
      </div>
    </main>
  )
}
