import React from 'react'

function Navbar() {

  let buttonClass = "text-gray-700 hover:text-indigo-600"

  return (
    <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">EduMorph</h1>
          <div className="space-x-4">
            <button className="bg-indigo-800 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-indigo-900">Get Started</button>
            <button className={buttonClass}>Home</button>
            <button className={buttonClass}>Sign Up</button>
            <button className={buttonClass}>Contact</button>
          </div>
        </div>
      </nav>
  )
}

export default Navbar