import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: {
      sites: {
        isOpen: false
      },
      environments: {
        isOpen: false,
        list: false,
        selected: null,
        edit: false,
        delete: false
      }
    }
  },
  reducers: {
    setItemAsOpen: (state, action) => {
      const key = action.payload;
      state.items[key].isOpen = true;
    },
    setItemAsClosed: (state, action) => {
      const key = action.payload;
      state.items[key].isOpen = false;
    },
    openEnvironmentList: (state) => {
      state.items.environments.list = true;
    },
    closeEnvironmentList: (state) => {
      state.items.environments.list = false;
    },
    setSelectedEnvironment: (state, action) => {
      state.items.environments.selected = action.payload;
    },
    openEnvironmentEdit: (state) => {
      state.items.environments.edit = true;
    },
    closeEnvironmentEdit: (state) => {
      state.items.environments.edit = false;
    },
    openEnvironmentDelete: (state) => {
      state.items.environments.delete = true;
    },
    closeEnvironmentDelete: (state) => {
      state.items.environments.delete = false;
    }
  }
});

export const menuAction = menuSlice.actions;

export default menuSlice.reducer;
