import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import SiteFormDialog from './SiteFormDialog'
import { useAddSiteMutation, clearCategorySites } from '@/app/services/sites'
import { useGetIconsQuery } from '@/app/services/icons'
import { mainAction } from '@/app/store/main-slice'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import { ApiResponse } from '@/app/types'
import { getValidationStatusMsg } from '@/app/utils/form'

const SiteAddDialog = () => {
  const dispatch = useAppDispatch()
  const menuSite = useAppSelector(state => state.menuSite)
  const category = useAppSelector(state => state.category)
  const [addSite, { isLoading }] = useAddSiteMutation()
  let { data: icons = [] } = useGetIconsQuery()

  const onSaveClick = async () => {
    if (menuSite.selected) {
      dispatch(mainAction.clearStatusMsg())

      const params = {
        categoryId: category.selected?.id,
        name: menuSite.selected.name,
        url: menuSite.selected.url,
        iconId: menuSite.selected.icon?.id
      }
      const response: ApiResponse = await addSite(params) as ApiResponse

      console.log('ADD!!!', response)

      if (response.data) {
        const categoryId = Number(category?.selected?.id)
        dispatch(clearCategorySites(categoryId))
        
        dispatch(menuSiteAction.closeAdd())
        dispatch(menuSiteAction.setSelected(null))
      } else {
        setStatusMsg(response)
      }
    }
  }

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeAdd())
    dispatch(menuSiteAction.setSelected(null))
  }

  const setStatusMsg = (response: ApiResponse) => {
    const statusMsg = getValidationStatusMsg(response)

    if (statusMsg) {
      dispatch(mainAction.setStatusMsg(statusMsg))
    }
  }

  useEffect(() => {
    if (menuSite.selected == null && icons.length > 0) {
      dispatch(menuSiteAction.setSelectedAsNew(icons[0]))
    }
  }, [dispatch, icons, menuSite])

  if (menuSite.add === true && menuSite.selected) {
    return (
      <SiteFormDialog
        title={ 'Add Site' }
        onSaveFtn={ onSaveClick }
        onCloseFtn={ onCloseClick } />
    )
  }
  return (null)
}

export default SiteAddDialog