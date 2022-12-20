import '../styles/global.scss';
import { Provider } from 'react-redux';
import store from '../store/store';
import authGuard from '../utils/auth-guard';

export default function MyApp({ Component, pageProps }) {
  authGuard();

  return  <Provider store={ store }>
            <Component {...pageProps} />
          </Provider>
}
