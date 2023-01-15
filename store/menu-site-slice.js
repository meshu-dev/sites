import { createSlice } from '@reduxjs/toolkit';

export const menuSiteSlice = createSlice({
  name: 'menuSite',
  initialState: {
    writeMode: false,
    selected: null,
    add: false,
    edit: false,
    delete: false
  },
  reducers: {
    toggleWriteMode: (state) => {
      state.writeMode = state.writeMode ? false : true;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSelectedIcon: (state, action) => {
      state.selected.icon = action.payload;
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

export const menuSiteAction = menuSiteSlice.actions;

export default menuSiteSlice.reducer;
