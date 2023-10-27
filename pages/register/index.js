import RegisterScreen from '@/components/RegisterScreen'
import LayoutRoot from '@/layouts/Layout'
import React from 'react'

const Register = () => {
  return (
    <LayoutRoot>
    <div className='bg-login h-screen flex justify-center items-center'>
        <RegisterScreen/>
    </div>
    </LayoutRoot>
  )
}

export default Register