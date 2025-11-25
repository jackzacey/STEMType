// app/page.tsx
export default function Home() {
  return (
    <>
      {/* FULL-SCREEN ROTATING BLACK HOLE — BLACK BACKGROUND, WHITE ACCRETION DISK */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover"
        src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_60fps.mp4"
      />

      {/* WHITE TEXT — CLEAN, MINIMAL, COSMIC */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-8 text-center">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter drop-shadow-2xl">
          STEMTYPE
        </h1>
        <p className="text-4xl md:text-6xl mt-8 opacity-90 font-light">
          Type the Universe
        </p>
        <button className="mt-20 px-16 py-8 text-4xl bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-2xl hover:bg-white/20 transition duration-300">
          ENTER
        </button>
      </div>
    </>
  )
}
