import React from 'react'

function PracticeModeCard({ title, description, icon, onStart }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-indigo-100 rounded-lg">{icon}</div>
        <div>
          <h3 className="text-lg text-slate-700  font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      <button 
        onClick={onStart}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Start Practice
      </button>
    </div>
  );
}

export default PracticeModeCard