import * as React from 'react'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { Button } from '@mui/material'
import EnvSelector from './EnvSelector'
import { useGetCategoriesQuery } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import styles from './EnvSelectorSection.module.scss'

const EnvSelectorSection = () => {
  const dispatch = useAppDispatch()
  const mainState = useAppSelector(state => state.main)
  let { data: categories = [] } = useGetCategoriesQuery()
  const buttonSectionCSS = { display: mainState.isEditMode ? 'flex' : 'none' }

  const showEditCategories = () => {
    console.log('showEditCategories')
    dispatch(menuCategoryAction.openList())
  }

  const showAddSite = () => {
    dispatch(mainAction.clearStatusMsg())
    dispatch(menuSiteAction.setSelected(null))

    dispatch(menuSiteAction.openAdd())
  }

  let siteButtonHtml

  if (categories?.length) {
    siteButtonHtml = (
      <Button
        variant="contained"
        onClick={ showAddSite }>
        Add Site
      </Button>
    )
  }

  return (
    <div id={ styles['environment-selector-wrapper'] }>
      <EnvSelector />
      <div id={ styles['environment-selector-btns'] } style={ buttonSectionCSS }>
        <Button
          variant="contained"
          onClick={ showEditCategories }>
          Categories
        </Button>
        { siteButtonHtml }
      </div>
    </div>
  )
}

export default EnvSelectorSection;
