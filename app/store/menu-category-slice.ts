import { createSlice } from '@reduxjs/toolkit'
import { Category } from '@/app/types'

export interface MenuCategoryState {
  list:     boolean,
  selected: Category | null,
  add:      boolean,
  edit:     boolean,
  delete:   boolean
}

const initialState: MenuCategoryState = {
  list:     false,
  selected: null,
  add:      false,
  edit:     false,
  delete:   false
}

export const menuCategorySlice = createSlice({
  name: 'menuCategory',
  initialState,
  reducers: {
    openList: (state) => {
      state.list = true
    },
    closeList: (state) => {
      state.list = false
    },
    setSelected: (state, action) => {
      state.selected = action.payload
    },
    openAdd: (state) => {
      state.add = true
    },
    closeAdd: (state) => {
      state.add = false
    },
    openEdit: (state) => {
      state.edit = true
    },
    closeEdit: (state) => {
      state.edit = false
    },
    openDelete: (state) => {
      state.delete = true
    },
    closeDelete: (state) => {
      state.delete = false
    }
  }
});

export const menuCategoryAction = menuCategorySlice.actions

export default menuCategorySlice.reducer
