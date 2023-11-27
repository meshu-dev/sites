import { createSlice } from '@reduxjs/toolkit'
import { Site } from '@/app/types'

export interface MenuSiteState {
  writeMode: boolean,
  selected:  Site | null,
  add:       boolean,
  edit:      boolean,
  delete:    boolean
}

const initialState: MenuSiteState = {
  writeMode: false,
  selected:  null,
  add:       false,
  edit:      false,
  delete:    false
}

export const menuSiteSlice = createSlice({
  name: 'menuSite',
  initialState,
  reducers: {
    toggleWriteMode: (state) => {
      state.writeMode = state.writeMode ? false : true
    },
    setSelected: (state, action) => {
      state.selected = action.payload
    },
    setSelectedName: (state, action) => {
      if (state.selected) {
        state.selected.name = action.payload
      }
    },
    setSelectedUrl: (state, action) => {
      if (state.selected) {
        state.selected.url = action.payload
      }
    },
    setSelectedIcon: (state, action) => {
      if (state.selected) {
        state.selected.icon = action.payload
      }
    },
    setSelectedAsNew: (state, action) => {
      const icon = action.payload

      state.selected = {
        name: '',
        url: '',
        icon: icon || null
      };
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

export const menuSiteAction = menuSiteSlice.actions

export default menuSiteSlice.reducer
