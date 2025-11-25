// app/page.tsx
export default function Home() {
  return (
    <>
      {/* VIDEO BACKGROUND — 1.8 MB, instant load, buttery smooth */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-10 w-full h-full object-cover"
        poster="https://pub-6842b074d1f54e18ab67d1572acf9b3f.r2.dev/blackhole-poster.jpg" // shows instantly while video loads
      >
        <source
          src="https://pub-6842b074d1f54e18ab67d1572acf9b3f.r2.dev/blackhole-final.webm"
          type="video/webm"
        />
        <source
          src="https://pub-6842b074d1f54e18ab67d1572acf9b3f.r2.dev/blackhole-final.mp4"
          type="video/mp4"
        />
        {/* Final fallback for dinosaurs */}
        <img
          src="https://svs.gsfc.nasa.gov/vis/a010000/a014100/a014132/BHW_Disk_and_Corona.gif"
          alt="Black Hole"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Subtle dark overlay so text is always readable */}
      <div className="fixed inset-0 -z-5 bg-black/40 pointer-events-none" />

      {/* Your content — unchanged, perfect */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-8 text-center">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter drop-shadow-2xl">
          STEMTYPE
        </h1>
        <p className="text-4xl md:text-6xl mt-8 opacity-90 font-light">
          Type the Universe
        </p>
        <button className="mt-20 px-16 py-8 text-4xl bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-2xl hover:bg-white/20 transition">
          ENTER
        </button>
      </main>
    </>
  );
}
