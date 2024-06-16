'use client'
import "./globals.css";
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Extender el tema de Chakra UI
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme} resetCSS={false}>
      {children}
    </ChakraProvider>
  )
}