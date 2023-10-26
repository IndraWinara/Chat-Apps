import GlobalProvider from '@/context/GlobalContext'
import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
    <GlobalProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalProvider>
  )
}
