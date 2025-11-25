export default function Home() {
  return (
    <>
      {/* Safety black canvas */}
      <div className="fixed inset-0 -z-10 bg-black" />

      {/* Working black hole video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 -z-10 w-full h-full object-cover"
        src="https://pub-1a90d1b58b164b51b2e09cc48d47a248.r2.dev/blackhole.mp4"
      />

      {/* Optional overlay */}
      <div className="fixed inset-0 -z-5 bg-black/40 pointer-events-none" />

      {/* Your content */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-8 text-center">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter drop-shadow-2xl">
          STEMTYPE
        </h1>
        <p className="text-4xl md:text-6xl mt-8 opacity-90 font-light tracking-wide">
          Type the Universe
        </p>
        <button className="mt-20 px-16 py-8 text-4xl bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 shadow-2xl">
          ENTER
        </button>
      </main>
    </>
  );
}
