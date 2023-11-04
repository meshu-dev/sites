import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SiteFormDialog from './SiteFormDialog';
import { useAddSiteMutation, clearEnvironmentSites } from '@/app/services/sites';
import { useGetIconsQuery } from '@/app/services/icons';
import { mainAction } from '@/app/store/main-slice';
import { menuSiteAction } from '@/app/store/menu-site-slice';

const SiteAddDialog = () => {
  const dispatch = useDispatch();
  const menuSite = useSelector(state => state.menuSite);
  const environment = useSelector(state => state.environment);
  const [addSite, { isLoading }] = useAddSiteMutation();
  let { data: icons = [] } = useGetIconsQuery();

  const onSaveClick = async () => {
    dispatch(mainAction.clearStatusMsg());

    const params = {
      environmentId: environment.selected.id,
      name: menuSite.selected.name,
      url: menuSite.selected.url,
      iconId: menuSite.selected.icon.id
    };

    const response = await addSite(params);

    setStatusMsg(response);

    if (response['data']['errors'] == null) {
      dispatch(clearEnvironmentSites(environment.selected.id));
      
      dispatch(menuSiteAction.closeAdd());
      dispatch(menuSiteAction.setSelected(null));
    }
  };

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeAdd());
    dispatch(menuSiteAction.setSelected(null));
  };

  const setStatusMsg = (response) => {
    if (response['data']['errors']) {
      const data = response['data']['errors'];
      let messages = [];

      if (data['name']) {
        messages.push(data['name']);
      }

      if (data['url']) {
        messages.push(data['url']);
      }

      const params = {
        type: 'error',
        messages: messages
      };

      dispatch(mainAction.setStatusMsg(params));
    }
  }

  useEffect(() => {
    if (menuSite.selected == null && icons.length > 0) {
      console.log('A2', icons);
      dispatch(menuSiteAction.setSelectedAsNew(icons[0]));
    }
  }, [menuSite.add]);

  if (menuSite.add === true && menuSite.selected) {
    return (
      <SiteFormDialog
        title={ 'Add Site' }
        onSaveFtn={ onSaveClick }
        onCloseFtn={ onCloseClick } />
    );
  }
  return (null);
};

export default SiteAddDialog;