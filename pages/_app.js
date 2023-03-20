import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '../store/store';
import authGuard from '../utils/auth-guard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

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

export default function MyApp({ Component, pageProps }) {
  authGuard();

  return  <Provider store={ store }>
            <ThemeProvider theme={ theme }>
              <Component { ...pageProps } />
            </ThemeProvider>
          </Provider>
}
