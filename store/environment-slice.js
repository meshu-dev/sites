import { createSlice } from '@reduxjs/toolkit';

export const environmentSlice = createSlice({
  name: 'environment',
  initialState: {
    selected: null,
    isLoading: true,
    dialog: null
  },
  reducers: {
    setSelectedEnvironment: (state, action) => {
      state.selected = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    setDialog: (state, action) => {
      state.dialog = action.payload;
    }
  }
});

export const environmentAction = environmentSlice.actions;

export default environmentSlice.reducer;
