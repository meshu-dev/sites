import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import EnvSelectorDropdown from './EnvSelectorDropdown'
import { useGetCategoriesQuery } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { categoryAction } from '@/app/store/category-slice'
import { InputEvent } from '@/app/types'
import { Category } from '@/app/types'
import { SelectChangeEvent } from '@mui/material'

const EnvSelector = () => {
  const envState = useAppSelector(state => state.category)
  const dispatch = useAppDispatch()
  const { data: categories = [], isFetching } = useGetCategoriesQuery()

  const onOptionChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    const categoryId: number = Number(event.target.value)
    
    const filteredCategories: Category[] = categories.filter(category => category.id == categoryId)
    const foundCategory: Category | null = filteredCategories[0] ?? null

    if (foundCategory) {
      dispatch(categoryAction.setSelected(foundCategory))
      dispatch(mainAction.startLoading())
    }
  };

  useEffect(() => {
    if (envState.selected == null && categories) {
      dispatch(categoryAction.setSelected(categories[0]))
    }
  }, [dispatch, envState, categories])
  
  if (categories?.length > 0) {
    return (
      <EnvSelectorDropdown
        selectedEnv={ envState.selected?.id ? String(envState.selected.id) : '' }
        categories={ categories }
        onOptionChange={ onOptionChange } />
    )
  }
  return (null)
}

export default EnvSelector
