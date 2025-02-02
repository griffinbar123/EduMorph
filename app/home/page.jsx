'use client'

import React from 'react'
import useSWR from 'swr';
import { StudyDeckCard } from '../components/study-deck-card';
import { deckStore } from '../store/decks';

const fetcher = (url) => fetch(url).then((r) => r.json())

function HomePage() {
  
  const { data, error, isLoading } = useSWR(
    '/api/learning-module',
    fetcher
  )

  const addDecks = deckStore((state) => state.addDecks)
 
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  addDecks(data)


  return (
    <div className="grid z-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {
          data.map((deck) =>
            <StudyDeckCard key={deck.id} id={deck.id} title={deck.title} lastAccessed={new Date()} 
          progress={deck.progress} tags={deck.tags} aiGenerated={deck.tags} questionCount={deck.questionCount} /> 
          )
        }
    </div>
  )
}

export default HomePage