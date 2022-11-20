import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isLoading: true,
    isEditMode: false
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    toggleEditMode: (state) => {
      state.isEditMode = state.isEditMode ? false : true;
    }
  }
});

export const mainAction = mainSlice.actions;

export default mainSlice.reducer;
