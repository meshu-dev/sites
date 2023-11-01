import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isLoading: true,
    isLoggedIn: false,
    isEditMode: false,
    statusMsg: null,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    toggleEditMode: (state) => {
      state.isEditMode = state.isEditMode ? false : true;
    },
    setStatusMsg: (state, action) => {
      state.statusMsg = action.payload;
    },
    clearStatusMsg: (state) => {
      state.statusMsg = null;
    }
  }
});

export const mainAction = mainSlice.actions;

export default mainSlice.reducer;
