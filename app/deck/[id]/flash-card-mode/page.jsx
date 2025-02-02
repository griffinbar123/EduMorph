import Flashcard from '@/app/components/flashcard';
import React, { useState } from 'react'

function FlashCardPage() {
    const [cards, setCards] = useState([
        { front: "When did WWII end?", back: "1945" },
        { front: "Allied Powers", back: "UK, US, USSR, China" }
    ]);
    const [currentCard, setCurrentCard] = useState(0);
    
  return (
    <div className="max-w-2xl mx-auto">
        <Flashcard front={cards[currentCard].front} back={cards[currentCard].back}/>
            <div className="flex justify-between mt-6">
            <button
                onClick={() => setCurrentCard(Math.max(0, currentCard - 1))}
                className="px-4 py-2 text-white bg-gray-700 hover:bg-indigo-700 rounded-lg"
            >
                {"<"}
            </button>
            <span className='text-gray-700 grow-0'>{currentCard + 1} / {cards.length}</span>
            <button
                onClick={() => setCurrentCard(Math.min(cards.length - 1, currentCard + 1))}
                className="px-4 py-2 text-white bg-gray-700 hover:bg-indigo-700 rounded-lg"
            >
                {">"}
            </button>
        </div>
    </div>
  )
}

export default FlashCardPage