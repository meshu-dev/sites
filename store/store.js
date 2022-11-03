import { configureStore } from '@reduxjs/toolkit';
import api from '../services/api';
import environmentReducer from './environment-slice';
import menuReducer from './menu-slice';

console.log('api', api);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    environment: environmentReducer,
    menu: menuReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
});

export default store;

