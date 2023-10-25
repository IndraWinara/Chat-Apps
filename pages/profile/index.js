import ProfileScreen from '@/components/ProfileScreen'
import LayoutRoot from '@/layouts/Layout'
import React from 'react'

const Profile = () => {
    return (
        <LayoutRoot>
            <div className='h-screen flex justify-center items-center'>
                <ProfileScreen />
            </div>
        </LayoutRoot>
    )
}

export default Profile