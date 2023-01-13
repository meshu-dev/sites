import { useSelector, useDispatch } from 'react-redux';
import SiteFormDialog from './SiteFormDialog';
import { useEditSiteMutation, clearEnvironmentSites } from '@/services/sites';
import { mainAction } from '@/store/main-slice';
import { menuSiteAction } from '@/store/menu-site-slice';

const SiteEditDialog = () => {
  const dispatch = useDispatch();
  const menuSite = useSelector(state => state.menuSite);
  const environment = useSelector(state => state.environment);
  const [editSite, { isLoading }] = useEditSiteMutation();

  const onSaveClick = async (params) => {
    dispatch(mainAction.clearStatusMsg());

    params['id'] = menuSite.selected.id;
    params['environment_id'] = environment.selected.id;

    const response = await editSite(params);

    setStatusMsg(response);

    console.log('RRR', response, response['data']['errors'] == null);

    if (response['data']['errors'] == null) {
      dispatch(clearEnvironmentSites(environment.selected.id));
      dispatch(menuSiteAction.closeEdit());
    }
  };

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeEdit());
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
  };

  const editForm = (<SiteFormDialog
                      title={ 'Edit Site' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuSite.edit ? editForm : null }
    </div>
  );
};

export default SiteEditDialog;