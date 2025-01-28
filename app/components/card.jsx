import React from 'react'
import CardContent from './card-content'

function Card({title, text}) {
  return (
    <div className="bg-white shadow-md p-6 text-center">
          <h3 className="text-xl font-bold text-indigo-600 mb-4">{title}</h3>
          <CardContent text={text} />
    </div>
  )
}

export default Card