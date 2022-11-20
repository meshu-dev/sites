import { createSlice } from '@reduxjs/toolkit';

export const menuEnvironmentSlice = createSlice({
  name: 'menuEnvironment',
  initialState: {
    list: false,
    selected: null,
    add: false,
    edit: false,
    delete: false
  },
  reducers: {
    openList: (state) => {
      state.list = true;
    },
    closeList: (state) => {
      state.list = false;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    openAdd: (state) => {
      state.add = true;
    },
    closeAdd: (state) => {
      state.add = false;
    },
    openEdit: (state) => {
      state.edit = true;
    },
    closeEdit: (state) => {
      state.edit = false;
    },
    openDelete: (state) => {
      state.delete = true;
    },
    closeDelete: (state) => {
      state.delete = false;
    }
  }
});

export const menuEnvironmentAction = menuEnvironmentSlice.actions;

export default menuEnvironmentSlice.reducer;
