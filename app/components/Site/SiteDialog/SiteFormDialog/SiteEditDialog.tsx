import { useAppDispatch, useAppSelector } from '@/app/hooks'
import SiteFormDialog from './SiteFormDialog'
import { useEditSiteMutation, clearCategorySites } from '@/app/services/sites'
import { mainAction } from '@/app/store/main-slice'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import { ApiResponse, Site } from '@/app/types'
import { getValidationStatusMsg } from '@/app/utils/form'

const SiteEditDialog = () => {
  const dispatch = useAppDispatch()
  const menuSite = useAppSelector(state => state.menuSite)
  const category = useAppSelector(state => state.category)
  const [editSite, { isLoading }] = useEditSiteMutation()

  const onSaveClick = async () => {
    if (menuSite.selected) {
      dispatch(mainAction.clearStatusMsg())

      const params = {
        id: menuSite.selected.id,
        categoryId: category.selected?.id,
        name: menuSite.selected.name,
        url: menuSite.selected.url,
        iconId: menuSite.selected.icon?.id
      }
      const response: ApiResponse = await editSite(params) as ApiResponse
  
      console.log('RRR', response)

      if (response.data) {
        const categoryId = Number(category?.selected?.id)
        dispatch(clearCategorySites(categoryId))
        
        dispatch(menuSiteAction.closeEdit())
        dispatch(menuSiteAction.setSelected(null))
      } else {
        setStatusMsg(response)
      }
    }
  }

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeEdit())
    dispatch(menuSiteAction.setSelected(null))
  };

  const setStatusMsg = (response: ApiResponse) => {
    const statusMsg = getValidationStatusMsg(response)

    if (statusMsg) {
      dispatch(mainAction.setStatusMsg(statusMsg))
    }
  }

  if (menuSite.edit === true && menuSite.selected) {
    return (
      <SiteFormDialog
        title={ 'Edit Site' }
        onSaveFtn={ onSaveClick }
        onCloseFtn={ onCloseClick } />
    );
  }
  return (null);
};

export default SiteEditDialog;