'use client'

import React, {useEffect, useState} from 'react'
import { userStore } from '../store/user'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import StudyDeckForm from '../components/studydeck-form'

function HomeLayout({ children }) {

    const userLogIn = userStore((state) => state.userLogIn)
    const supabase = createClient()
    const router = useRouter()

    const [isStudyFormShown, setIsStudyFormShown] = useState(false)

    async function getUser() {
        const { data, error } = await supabase.auth.getUser()
        if (error || !data?.user) {
          router.push('/login')
        } else {
            userLogIn()
        }   
    }

    useEffect(()=>{
        if(!router) return;
        // codes using router.query
        getUser()
    }, [router]);

    const createDeck = async (e) => {
      
      console.log(e)
      
    };

  return (
    <div className="container mx-auto p-6">
      <StudyDeckForm onCreateDeck={createDeck} isOpen={isStudyFormShown} onClose={()=>setIsStudyFormShown(false)}/>
      <h2 className="text-2xl text-slate-800 font-semibold mb-4">Your Study Decks</h2>
      <input type="text" placeholder="Search decks..." className="w-full p-2 border rounded" />
      <button onClick={() => setIsStudyFormShown(true)} className="mt-4 w-full bg-indigo-600 mb-6 text-white py-3 rounded-lg">+ Create New Study Deck</button>
      {children}
    </div>
  )
}

export default HomeLayout