// app/page.tsx
export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* MOVING BLACK HOLE GIF — FULL-SCREEN, LOOPING EVENT HORIZON */}
      <img
        src="https://svs.gsfc.nasa.gov/vis/a010000/a014300/a014326/Black_Hole_Accretion_Disk_1080p.gif"
        alt="Black Hole Event Horizon"
        className="fixed inset-0 w-full h-full object-cover"
      />

      {/* CONTENT — FLOATING ON TOP WITH WHITE TEXT */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white px-8 text-center">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter drop-shadow-2xl">
          STEMTYPE
        </h1>
        <p className="text-4xl md:text-6xl mt-8 opacity-90 font-light">
          Type the Universe
        </p>
        <button className="mt-20 px-16 py-8 text-4xl bg-white/10 backdrop-blur-md border-4 border-white/30 rounded-2xl hover:bg-white/20 transition">
          ENTER
        </button>
      </div>
    </div>
  );
}
