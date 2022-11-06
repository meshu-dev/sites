import { useSelector, useDispatch } from 'react-redux';
import { useAddSiteMutation, clearEnvironmentSites } from '../../../../services/sites';
import { menuSiteAction } from '../../../../store/menu-site-slice';
import SiteFormDialog from './SiteFormDialog';

const SiteAddDialog = () => {
  const dispatch = useDispatch();
  const menuSite = useSelector(state => state.menuSite);
  const environment = useSelector(state => state.environment);
  const [addSite, { isLoading }] = useAddSiteMutation();

  const onSaveClick = async (params) => {
    params['environment_id'] = environment.selected.id;
    await addSite(params);

    dispatch(clearEnvironmentSites(environment.selected.id));
    dispatch(menuSiteAction.closeAdd());
  };

  const onCloseClick = () => {
    dispatch(menuSiteAction.closeAdd());
    dispatch(menuSiteAction.setSelected(null));
  };

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