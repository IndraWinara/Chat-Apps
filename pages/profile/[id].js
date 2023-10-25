import DetailProfile from '@/components/DetailProfile'
import ProfileScreen from '@/components/ProfileScreen'
import LayoutRoot from '@/layouts/Layout'
import { useRouter } from 'next/router'
import React from 'react'

const Profile = () => {
 
   
    return (
        <LayoutRoot>
            <div className='h-screen flex justify-center items-center'>
                <DetailProfile/>
            </div>
        </LayoutRoot>
    )
}

export default Profile