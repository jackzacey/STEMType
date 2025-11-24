import TypingEngine from '../../../components/TypingEngine'
import { characteristicsTerms } from '../../../data/terms/characteristics'

export default function Characteristics() {
  return (
    <main className="min-h-screen bg-bg text-text flex flex-col items-center py-12 px-8">
      <h1 className="text-5xl font-bold text-blue mb-8 animate-pulse-slow">
        Characteristics of Life
      </h1>
      <p className="text-xl opacity-90 mb-12">25 terms · Type the exact definition to continue</p>
      
      <TypingEngine terms={characteristicsTerms} />
    </main>
  );
}
