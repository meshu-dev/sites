import * as React from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { Button } from '@mui/material'
import EnvSelector from './EnvSelector'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import styles from './EnvSelectorSection.module.scss'

const EnvSelectorSection = () => {
  const dispatch = useAppDispatch();
  const mainState = useAppSelector(state => state.main);
  const buttonSectionCSS = { display: mainState.isEditMode ? 'flex' : 'none' };

  const showEditCategories = () => {
    console.log('showEditCategories')
    dispatch(menuCategoryAction.openList());
  };

  const showAddSite = () => {
    dispatch(mainAction.clearStatusMsg());
    dispatch(menuSiteAction.setSelected(null));

    dispatch(menuSiteAction.openAdd());
  };

  return (
    <div id={ styles['environment-selector-wrapper'] }>
      <EnvSelector />
      <div id={ styles['environment-selector-btns'] } style={ buttonSectionCSS }>
        <Button
          variant="contained"
          onClick={ showEditCategories }>
          Edit Category
        </Button>
        <Button
          variant="contained"
          onClick={ showAddSite }>
          Add Site
        </Button>
      </div>
    </div>
  );
}

export default EnvSelectorSection;
