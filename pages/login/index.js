import LoginScreen from '@/components/LoginScreen'
import LayoutRoot from '@/layouts/Layout'
import React from 'react'

const page = () => {
  return (
    <LayoutRoot>
    <div className='h-screen flex justify-center items-center'>
      <LoginScreen/>
    </div>
    </LayoutRoot>
  )
}

export default page