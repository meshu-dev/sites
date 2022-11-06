import { useSelector, useDispatch } from 'react-redux';
import { useEditSiteMutation, clearEnvironmentSites } from '../../../../services/sites';
import { menuSiteAction } from '../../../../store/menu-site-slice';
import SiteFormDialog from './SiteFormDialog';

const SiteEditDialog = () => {
  const dispatch = useDispatch();
  const menuSite = useSelector(state => state.menuSite);
  const environment = useSelector(state => state.environment);
  const [editSite, { isLoading }] = useEditSiteMutation();

  const onSaveClick = async (params) => {
    params['id'] = menuSite.selected.id;
    params['environment_id'] = environment.selected.id;
    console.log('editSite', params);

    await editSite(params);

    dispatch(clearEnvironmentSites(environment.selected.id));
    dispatch(menuSiteAction.closeEdit());
  };

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeEdit());
    dispatch(menuSiteAction.setSelected(null));
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