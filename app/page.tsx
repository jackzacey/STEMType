export default function Home() {
  return (
    <>
      {/* THE BLACK HOLE — THIS IS THE ONLY BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-50 bg-black"
        src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_60fps.mp4"
        poster="https://images.pexels.com/videos/855564/free-video-855564.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
      />

      {/* CONTENT — ALWAYS CLICKABLE */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-white text-center px-8">
        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter drop-shadow-2xl">
          STEMTYPE
        </h1>
        <p className="text-4xl md:text-6xl mt-8 opacity-90">
          Type the Universe
        </p>
        <button className="mt-20 px-16 py-8 text-4xl bg-cyan-500/20 backdrop-blur-md border-4 border-cyan-400 rounded-2xl hover:bg-cyan-500/40 transition">
          ENTER
        </button>
      </div>
    </>
  )
}
