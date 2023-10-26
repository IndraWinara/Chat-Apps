import React from 'react'
import Header from '@/components/Header'

const LayoutRoot = ({ children }) => {
    return (
        <>

                <Header />
                {children}
                {/* <Footer/> */}

        </>
    )
}

export default LayoutRoot