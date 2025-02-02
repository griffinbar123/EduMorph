'use client'

import { useParams, useRouter } from 'next/navigation';
import ContentEditor from '@/app/components/content-editor';
import Link from 'next/link';

export default function DeckEditPage() {
  const router = useRouter(); 
  const { id } = useParams()
  
  // Fetch deck data (replace with actual data fetching)
  const studyDeck = {
    id: 1,
    title: "World War II History",
    content: [
        {
          type: "flashcard",
          question: "When did WWII end in Europe?",
          answer: "May 8, 1945 (VE Day)",
          difficulty: "easy",
          tags: ["dates", "european-theater"]
        },
        {
          type: "mcq",
          question: "Which event directly triggered Britain's entry into WWII?",
          options: [
            "Invasion of Poland",
            "Bombing of Pearl Harbor",
            "Invasion of France",
            "Battle of Britain"
          ],
          correctIndex: 0,
          explanation: "Britain had pledged to defend Poland's sovereignty, leading to their declaration of war after the German invasion.",
          difficulty: "medium",
          tags: ["causes", "europe"]
        },
        {
          type: "short-answer",
          question: "What was the significance of the Battle of Midway?",
          answer: "Turning point in Pacific Theater - US destroyed 4 Japanese aircraft carriers, gaining naval supremacy",
          sampleAnswer: "The June 1942 battle marked Japan's first major naval defeat and halted their Pacific expansion.",
          difficulty: "hard",
          tags: ["pacific-theater", "naval-battles"]
        },
        {
          type: "essay",
          question: "Analyze the role of propaganda in maintaining civilian morale during WWII",
          guidelines: [
            "Compare Axis and Allied approaches",
            "Discuss different media formats used",
            "Consider long-term societal impacts"
          ],
          difficulty: "advanced",
          tags: ["society", "psychology"]
        },
        {
          type: "flashcard",
          question: "What was the 'Final Solution'?",
          answer: "Nazi plan for systematic genocide of Jewish people",
          context: "Part of Holocaust implementation decided at Wannsee Conference 1942",
          difficulty: "medium",
          tags: ["holocaust", "policy"]
        },
        {
          type: "mcq",
          question: "Which two cities were atomic bombed in 1945?",
          options: [
            "Hiroshima & Nagasaki",
            "Tokyo & Osaka",
            "Berlin & Dresden",
            "London & Manchester"
          ],
          correctIndex: 0,
          explanation: "The atomic bombings on August 6 and 9 forced Japan's surrender, avoiding a ground invasion.",
          difficulty: "easy",
          tags: ["pacific-theater", "technology"]
        },
        {
          type: "sequence",
          question: "Order these European battles chronologically:",
          items: [
            "Battle of Britain",
            "D-Day",
            "Stalingrad",
            "Invasion of Poland"
          ],
          correctOrder: [3, 0, 2, 1],
          difficulty: "hard",
          tags: ["chronology", "european-theater"]
        },
        {
          type: "matching",
          question: "Match leaders to their countries:",
          pairs: [{ id: 1, prompt: 'Capital of France', answer: 'Paris' },
          { id: 2, prompt: 'Largest planet', answer: 'Jupiter' }],
          difficulty: "medium",
          tags: ["leadership", "countries"]
        }
      ] // AI-generated content
  };

  const handleSave = (updatedContent) => {
    console.log("not saving this yet:", updatedContent)
    // Save logic here
    router.push(`/deck/${id}`); // Return to view mode 
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <header className="">
        <nav className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <div className="text-center w-full">
            <h1 className="text-2xl text-slate-800 font-bold">Editing: {studyDeck.title}</h1>
          </div>
          <div /> 
        </nav>
        <nav className='max-w-6xl mx-auto py-1 px-4 flex justify-start items-center'>
        <Link
            href={`/deck/${id}`} className="text-gray-600 hover:text-indigo-600">
            ← Back to Deck
          </Link>
        </nav>
      </header>


      {/* Edit Interface */}
      <main className="max-w-3xl mx-auto p-4">
        <ContentEditor 
          aiContent={studyDeck.content} 
          onSave={handleSave}
        />
      </main>
    </div>
  );
}