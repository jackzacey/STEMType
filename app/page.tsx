// app/page.tsx
export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* MOVING BLACK HOLE GIF — FULL-SCREEN EVENT HORIZON */}
      <img
        src="https://svs.gsfc.nasa.gov/vis/a010000/a014100/a014132/BHW_Disk_and_Corona.gif"
        alt="Black Hole Event Horizon"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />

      {/* WHITE TEXT — FLOATING ON TOP */}
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
