import '../styles/globals.css'
import '../styles/bootstrap.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from "@chakra-ui/theme-tools"

function Cl({ Component, pageProps }) {
  const config = {
    useSystemColorMode: true,
    initialColorMode: "dark",
    styles: {
      Global: () => ({
        body: {
          bg: mode('#fffff', 'gray.800')
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
