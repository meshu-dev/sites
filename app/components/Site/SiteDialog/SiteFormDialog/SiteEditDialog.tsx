import { useAppDispatch, useAppSelector } from '@/app/hooks'
import SiteFormDialog from './SiteFormDialog'
import { useEditSiteMutation, clearCategorySites } from '@/app/services/sites'
import { mainAction } from '@/app/store/main-slice'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import { ApiResponse, Site } from '@/app/types'

const SiteEditDialog = () => {
  const dispatch = useAppDispatch()
  const menuSite = useAppSelector(state => state.menuSite)
  const category = useAppSelector(state => state.category)
  const [editSite, { isLoading }] = useEditSiteMutation()

  const onSaveClick = async () => {
    dispatch(mainAction.clearStatusMsg())

    /*
    const params = {
      id: menuSite.selected.id,
      category_id: category.selected.id,
      name: menuSite.selected.name,
      url: menuSite.selected.url,
      icon_id: menuSite.selected.icon.id
    }; */

    let site: Site | null = menuSite.selected

    if (site) {
      site.categoryId = category?.selected?.id

      const data = await editSite(site)
  
      //setStatusMsg(response)
  
      console.log('RRR', data)
  
      if (category?.selected?.id) {
        dispatch(clearCategorySites(category.selected.id))
  
        dispatch(menuSiteAction.closeEdit())
        dispatch(menuSiteAction.setSelected(null))
      }
    }
  }

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeEdit())
    dispatch(menuSiteAction.setSelected(null))
  };

  const setStatusMsg = () => {
    /*
    if (response['data']['errors']) {
      const data = response['data']['errors'];
      let messages = [];

      if (data['name']) {
        messages.push(data['name'])
      }

      if (data['url']) {
        messages.push(data['url'])
      }

      const params = {
        type: 'error',
        messages: messages
      };

      dispatch(mainAction.setStatusMsg(params))
    } */

    dispatch(mainAction.setStatusMsg('Added site error'))
  };

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