import { configureStore } from '@reduxjs/toolkit'
import api from '../services/api'
import mainReducer from './main-slice'
import categoryReducer from './category-slice'
import menuCategoryReducer from './menu-category-slice'
import menuSiteReducer from './menu-site-slice'

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    main: mainReducer,
    category: categoryReducer,
    menuCategory: menuCategoryReducer,
    menuSite: menuSiteReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(api.middleware)
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
