import { createSlice } from '@reduxjs/toolkit'

export interface MainState {
  isLoading:  boolean,
  isLoggedIn: boolean,
  isEditMode: boolean,
  statusMsg:  string | null
}

const initialState: MainState = {
  isLoading:  true,
  isLoggedIn: false,
  isEditMode: false,
  statusMsg:  null
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    finishLoading: (state) => {
      state.isLoading = false
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    toggleEditMode: (state) => {
      state.isEditMode = state.isEditMode ? false : true
    },
    setStatusMsg: (state, action) => {
      state.statusMsg = action.payload
    },
    clearStatusMsg: (state) => {
      state.statusMsg = null
    }
  }
});

export const mainAction = mainSlice.actions

export default mainSlice.reducer
