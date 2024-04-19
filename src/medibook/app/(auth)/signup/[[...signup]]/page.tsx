import { SignUp, auth } from '@clerk/nextjs'
import React from 'react'

const Create = () => {

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <SignUp afterSignInUrl='/' signInUrl='/login' />
    </div>
  )
}

export default Create