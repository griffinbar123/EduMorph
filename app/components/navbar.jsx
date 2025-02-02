'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { userStore } from '../store/user'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

function Navbar() {

  const userLogOut = userStore((state) => state.userLogOut)
  const supabase = createClient()
  const router = useRouter()

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if(!error){
      userLogOut()
      router.push('/login')
    }
      
  }

  let buttonClass = "text-gray-700 hover:text-indigo-600"
  const isUserLoggedIn = userStore((state) => state.user.isLoggedIn)

  return (
    <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className=" hover:cursor-pointer text-2xl font-bold text-indigo-600">EduLana</Link>
          <div className="space-x-4">
            <Link href="/home" className={buttonClass}>Home</Link>
            <Link href="/contact" className={buttonClass}>Contact</Link>
            {!isUserLoggedIn && <Link href="/login" className={buttonClass}>Login</Link>}
            {!isUserLoggedIn && <Link href="/signup" className={" bg-indigo-800 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-indigo-900 "}>Sign Up</Link>}
            {isUserLoggedIn && <button onClick={signOut} className={" bg-indigo-800 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-indigo-900 "}>Sign Out</button>}
          </div>
        </div>
      </nav>
  )
}

export default Navbar