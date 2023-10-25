import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Header from '@/components/Header'

const LayoutRoot = ({ children }) => {
    return (
        <>
            <ChakraProvider>
                <Header />
                {children}
                {/* <Footer/> */}
            </ChakraProvider>
        </>
    )
}

export default LayoutRoot