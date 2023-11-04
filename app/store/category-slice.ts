import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    selected: null
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload;
    }
  }
});

export const categoryAction = categorySlice.actions;

export default categorySlice.reducer;
