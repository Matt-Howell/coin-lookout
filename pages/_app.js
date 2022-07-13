import '../styles/globals.css'
import '../styles/bootstrap.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

function Cl({ Component, pageProps }) {
  const config = {
    initialColorMode: "dark",
    styles: {
      Global: () => ({
        body: {
          bg: 'gray.800'
        },
      }),
    }
};
  
  const customTheme = extendTheme({ config })

  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default Cl
