import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isLoading: true,
    isLoggedIn: false,
    isEditMode: false
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    isLoggedIn: (state) => {
      state.isLoggedIn = state.isLoggedIn;
    },
    toggleEditMode: (state) => {
      state.isEditMode = state.isEditMode ? false : true;
    }
  }
});

export const mainAction = mainSlice.actions;

export default mainSlice.reducer;
