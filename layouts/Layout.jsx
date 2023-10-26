import React, { useContext } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { GlobalContext } from '@/context/GlobalContext'

const LayoutRoot = ({ children }) => {
    const {stateInput}= useContext(GlobalContext)
    const {isLoggedIn} = stateInput
    return (
        <>

                <Header />
                {children}
                {isLoggedIn? <Footer/> : null}
                

        </>
    )
}

export default LayoutRoot