import { useSelector, useDispatch } from 'react-redux';
import SiteFormDialog from './SiteFormDialog';
import { useAddSiteMutation, clearEnvironmentSites } from '@/services/sites';
import { mainAction } from '@/store/main-slice';
import { menuSiteAction } from '@/store/menu-site-slice';

const SiteAddDialog = () => {
  const dispatch = useDispatch();
  const menuSite = useSelector(state => state.menuSite);
  const environment = useSelector(state => state.environment);
  const [addSite, { isLoading }] = useAddSiteMutation();

  const onSaveClick = async (params) => {
    dispatch(mainAction.clearStatusMsg());

    params['environment_id'] = environment.selected.id;
    const response = await addSite(params);

    setStatusMsg(response);

    if (response['data']['errors'] == null) {
      dispatch(clearEnvironmentSites(environment.selected.id));
      dispatch(menuSiteAction.closeAdd());
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

  const addForm = (<SiteFormDialog
                      title={ 'Add Site' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuSite.add ? addForm : null }
    </div>
  );
};

export default SiteAddDialog;