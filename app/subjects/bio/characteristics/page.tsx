import TypingEngine from '../../../components/TypingEngine'
import { characteristicsTerms } from '../../../data/terms/characteristics'

export default function Characteristics() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-bg via-bg to-blue/5 flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl">
        <h1 className="text-center text-6xl md:text-8xl font-black text-blue drop-shadow-2xl mb-4 animate-pulse-slow">
          Characteristics of Life
        </h1>
        <p className="text-center text-xl md:text-2xl text-text-muted mb-16">
          Type the exact definition — watch your WPM climb and confetti explode
        </p>
        
        <div className="bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-blue/20 p-8 md:p-12">
          <TypingEngine terms={characteristicsTerms} />
        </div>
      </div>
    </main>
  )
}
