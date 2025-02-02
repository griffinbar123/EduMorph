import Link from 'next/link'
// import GoogleOneTap from '../components/google-one-tap'
import { signup } from './actions'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function SignUpPage() {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (!error && data?.user) {
    redirect('/home')
  }  

  // async function handleSignInWithGoogle(response) {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithIdToken({
  //       provider: 'google',
  //       token: response.credential
  //     })
  //     if (error) throw error
  //       console.log('Session data: ', data)
  //       console.log('Successfully logged in with Google One Tap button')

  //       // redirect to protected page
  //       router.push('/home')
  //       console.log("doing the thing")
  //     } catch (error) {
  //       console.error('Error logging in with Google One Tap', error)
  //     }
  //   }

  const inputClass = "w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* <GoogleOneTap/> */}
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className={inputClass}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className={inputClass}
              required
            />
          </div>
          <button
            type="submit"
            formAction={signup}
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200">
            Sign Up
          </button>
        </form>
        <div className='flex items-center flex-row w-full py-4'>
          <div className={"grow h-1 rounded-full mx-2 bg-slate-400"}></div>
          <span className="grow-0 text-slate-500">or</span>
          <div className={"grow h-1 rounded-full mx-2 bg-slate-400"}></div>
        </div>
        <div className='flex flex-col items-center justify-center w-full'>
          {/* <GoogleOneTap/> */}
        </div>
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}