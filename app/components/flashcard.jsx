import React, { useState } from "react";


// components/Flashcard.js
export default function Flashcard({ front, back }) {
    const [isFlipped, setIsFlipped] = useState(false); 
  
    return (
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className=" h-64 bg-white rounded-xl shadow-lg p-6 cursor-pointer transform transition-all duration-300 hover:scale-105"
      >
        <div className="h-full flex items-center justify-center text-center">
          <p className="text-lg text-slate-800 font-medium">
            {isFlipped ? back : front}
          </p>
        </div>
      </div>
    );
  }