import { configureStore } from '@reduxjs/toolkit';
import api from '../services/api';
import mainReducer from './main-slice';
import environmentReducer from './environment-slice';
import menuEnvironmentReducer from './menu-environment-slice';
import menuSiteReducer from './menu-site-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    main: mainReducer,
    environment: environmentReducer,
    menuEnvironment: menuEnvironmentReducer,
    menuSite: menuSiteReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware);
  }
});

export default store;

