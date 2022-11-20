import { createSlice } from '@reduxjs/toolkit';

export const environmentSlice = createSlice({
  name: 'environment',
  initialState: {
    selected: null
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    }
  }
});

export const environmentAction = environmentSlice.actions;

export default environmentSlice.reducer;
