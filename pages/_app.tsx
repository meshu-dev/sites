import '@/app/styles/global.scss'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider } from 'react-redux'
import store from '@/app/store/store'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    }
  }
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return  <SessionProvider session={ pageProps.session }>
            <Provider store={ store }>
              <ThemeProvider theme={ theme }>
                <Component { ...pageProps } />
              </ThemeProvider>
            </Provider>
          </SessionProvider>
}

/*
import type { AppProps } from 'next/app'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
} */
