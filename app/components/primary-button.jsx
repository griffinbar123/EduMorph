

import Link from 'next/link'
import React from 'react'

function PrimaryButton({text}) {
  return (
    <Link href={"/home"} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-indigo-700">
        {text}
    </Link>
  )
}

export default PrimaryButton