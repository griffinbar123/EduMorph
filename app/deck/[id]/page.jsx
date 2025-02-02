'use client'

import PracticeModeCard from '@/app/components/practice-mode-card';
import { useState } from 'react';
import FlashCardPage from './flash-card-mode/page';
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((r) => r.json())

const MODES = {
  FLASHCARD: 0,
  QUIZ: 1,
  DEEP: 2,
  EXAM: 3,
  NONE: 4
};

const studyModes = [
  {
    id: 'flashcards',
    title: "Flashcard Mode",
    description: "Learn key terms and concepts with interactive flashcards",
    icon: "🗂️",
    mode: MODES.FLASHCARD
  },
  {
    id: 'quizzes',
    title: "Quiz Mode",
    description: "Test your knowledge with multiple-choice questions",
    icon: "✍️",
    mode: MODES.QUIZ
  },
  {
    id: 'deep-dive',
    title: "Deep Dive",
    description: "Detailed explanations and essay prompts",
    icon: "🌊",
    mode: MODES.DEEP
  },
  {
    id: 'exam-simulator',
    title: "Exam Simulator",
    description: "Timed practice with mixed question types",
    icon: "⏱️",
    mode: MODES.EXAM
  }
]

export default function StudyDeckPage() {
  const { id } = useParams()

  const [selectedMode, setSelectedMode] = useState(MODES.NONE);

  const { data, error, isLoading } = useSWR(
    '/api/learning-module/' + id,
    fetcher
  )
 
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  // Mock data - replace with actual data fetching

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="">
        <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="text-center w-full">
            <h1 className="text-4xl text-slate-800  font-bold">{data.title}</h1>
            <p className="text-sm text-gray-600">
              Mastered {data.progress}/{data.questionCount}
            </p>
          </div>
          <div /> 
        </nav>
        <nav className='max-w-6xl mx-auto py-1 px-4 flex justify-between items-center'>
        <Link  
            href={`/home`} className="text-gray-600 hover:text-indigo-600">
            ← Back to Decks
          </Link>
          {/* Add Edit Button */}
          <Link  
            href={`/deck/${id}/edit`}
            className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faPencil} className="w-5 h-5" />
            Edit Deck
          </Link>
        </nav>
      </header>

      <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
</nav>

      {selectedMode === MODES.NONE ? (
        <main className="max-w-6xl mx-auto p-4">
          <h2 className="text-xl text-slate-700 font-semibold mb-6">Select Practice Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studyModes.map((mode) => (
              <PracticeModeCard
                key={mode.id}
                title={mode.title}
                description={mode.description}
                icon={mode.icon}
                onStart={() => setSelectedMode(mode.mode)}
              />
            ))}
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl text-slate-700 font-semibold">
              {studyModes.find(m => m.mode === selectedMode).title}
            </h2>
            <button
              onClick={() => setSelectedMode(MODES.NONE)}
              className="text-gray-600 hover:text-indigo-600"
            >
              ← Back to Modes
            </button>
          </div>
           {MODES.FLASHCARD === selectedMode && <FlashCardPage />}
        </main>
      )}
    </div>
  );
}