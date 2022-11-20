import { useSelector, useDispatch } from 'react-redux';
import { useDeleteSiteMutation, clearEnvironmentSites } from '../../../../services/sites';
import { menuSiteAction } from '../../../../store/menu-site-slice';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@mui/material';

const SiteDeleteDialog = () => {
  const dispatch = useDispatch();
  const menuSite = useSelector(state => state.menuSite);
  const environment = useSelector(state => state.environment);
  const site = menuSite.selected ? menuSite.selected : null;
  const [deleteSite, { isLoading }] = useDeleteSiteMutation();

  const onSelection = async (doDelete) => {
    if (doDelete === true) {
      await deleteSite(site.id);
      dispatch(clearEnvironmentSites(environment.selected.id));
    }
    dispatch(menuSiteAction.closeDelete());
    dispatch(menuSiteAction.setSelected(null));
  };

  return (
    <div>
      <Dialog
        open={ menuSite.delete ?? false }
        onClose={ () => onSelection(false) }
        scroll={ 'body' }
        fullWidth={ true }
      >
        <DialogTitle id="env-dialog-title">Delete Site?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the site { site ? site.name : '' }?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={ isLoading }
            onClick={ () => onSelection(true) }>
            Yes
          </Button>
          <Button
            onClick={ () => onSelection(false) }>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SiteDeleteDialog;
