import { configureStore } from '@reduxjs/toolkit';
import api from '../services/api';
import environmentReducer from './environment-slice';
import menuEnvironmentReducer from './menu-environment-slice';

console.log('api', api);

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    environment: environmentReducer,
    menuEnvironment: menuEnvironmentReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
});

export default store;

