// app/page.tsx
import Image from "next/image";
import blackholeOptimized from "@/public/blackhole-optimized.webp"; // we'll make this in 2 seconds

export default function Home() {
  return (
    <>
      {/* FULL-BLEED BACKGROUND — uses <img> as CSS background under the hood but Next.js optimizes it */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://pub-6842b074d1f54e18ab67d1572acf9b3f.r2.dev/blackhole-optimized.webp"
          alt="Black Hole"
          fill
          quality={95}
          priority // loads instantly (preloader)
          className="object-cover"
          unoptimized // because it's a .webp with animation (we'll use WebP or MP4 instead of GIF)
        />
      </div>

      {/* Optional dark vignette so text stays readable forever */}
      <div className="fixed inset-0 -z-5 bg-gradient-to-br from-black/60 via-transparent to-black/80 pointer-events-none" />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-8 text-center">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter drop-shadow-2xl">
          STEMTYPE
        </h1>
        <p className="text-4xl md:text-6xl mt-8 opacity-90 font-light tracking-wide">
          Type the Universe
        </p>
        <button className="mt-20 px-16 py-8 text-4xl bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105">
          ENTER
        </button>
      </main>
    </>
  );
}
