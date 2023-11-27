import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import EnvSelectorDropdown from './EnvSelectorDropdown'
import { useGetCategoriesQuery } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { categoryAction } from '@/app/store/category-slice'

const EnvSelector = () => {
  const envState = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();
  const { data: categories = [], isFetching } = useGetCategoriesQuery();

  const onOptionChange = (event) => {
    const categoryId: number = event.target.value;
    
    let selectedEnv = categories.filter(category => category.id == categoryId);
    selectedEnv = selectedEnv[0] ?? null;

    if (selectedEnv) {
      dispatch(categoryAction.setSelected(selectedEnv));
      dispatch(mainAction.startLoading());
    }
  };

  useEffect(() => {
    if (envState.selected == null) {
      dispatch(categoryAction.setSelected(categories[0]));
    }
  }, [dispatch, envState, categories]);
  
  if (categories.length > 0) {
    return (
      <EnvSelectorDropdown
        selectedEnv={ envState.selected ? envState.selected.id : '' }
        categories={ categories }
        onOptionChange={ onOptionChange } />
    );
  }
  return (null);
}

export default EnvSelector;
