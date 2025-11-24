'use client';
import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function TypingEngine({ terms }: { terms: { term: string; def: string }[] }) {
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [streak, setStreak] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const current = terms[index];

  useEffect(() => { inputRef.current?.focus(); }, [index]);

  useEffect(() => {
    if (!startTime && input.length > 0) setStartTime(Date.now());
    if (!startTime) return;
    const timeMin = (Date.now() - startTime) / 60000;
    const words = input.trim().split(' ').length;
    setWpm(Math.round(words / timeMin) || 0);
  }, [input, startTime]);

  const handleSubmit = () => {
    const correct = input.trim().toLowerCase() === current.def.toLowerCase();
    if (correct) {
      setStreak(s => s + 1);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#64d2ff', '#facc15'] });
      setIndex(i => i + 1);
      setInput('');
    } else {
      setStreak(0);
    }
    setAccuracy(prev => Math.round(((prev * index) + (correct ? 100 : 0)) / (index + 1)));
  };

  const progress = ((index) / terms.length) * 100;

  return (
    <div className="w-full max-w-4xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue mb-4">{current.term}</h2>
        <div className="w-full h-4 bg-card rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue to-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-6 flex justify-center gap-10 text-xl">
          <span>WPM: <span className="text-gold font-bold">{wpm}</span></span>
          <span>Accuracy: <span className="text-gold font-bold">{accuracy}%</span></span>
          <span>Streak: <span className="text-gold font-bold">{streak}</span></span>
        </div>
      </div>

      <textarea
        ref={inputRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && e.ctrlKey && handleSubmit()}
        placeholder="Type the definition exactly… (Ctrl+Enter to submit)"
        className="w-full h-48 p-6 bg-card rounded-2xl text-text text-lg resize-none focus:outline-none focus:ring-4 focus:ring-blue/50"
      />

      <div className="text-center mt-8">
        <button onClick={handleSubmit} className="rounded-2xl bg-blue px-16 py-5 text-bg-navy text-2xl font-bold hover:scale-110 transition-all shadow-2xl">
          Submit Answer
        </button>
      </div>

      {index === terms.length && (
        <div className="text-center mt-16 text-6xl font-bold text-gold animate-bounce">
          Unit Complete! 🎉
        </div>
      )}
    </div>
  );
}
