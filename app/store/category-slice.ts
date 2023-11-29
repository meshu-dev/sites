import { createSlice } from '@reduxjs/toolkit'
import { Category } from '@/app/types'

export interface CategoryState {
  selected: Category | null
}

const initialState: CategoryState = {
  selected: null
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload
    }
  }
})

export const categoryAction = categorySlice.actions

export default categorySlice.reducer
