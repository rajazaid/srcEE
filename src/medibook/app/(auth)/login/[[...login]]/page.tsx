import { SignIn, auth } from '@clerk/nextjs'
import React from 'react'

const Login = () => {
  
  return (
    <div className='flex items-center justify-center min-h-screen'>
        <SignIn afterSignInUrl='/' signUpUrl='/signup' />
    </div>
  )
}

export default Login