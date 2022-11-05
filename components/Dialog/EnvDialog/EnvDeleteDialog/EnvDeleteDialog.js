import { useSelector, useDispatch } from 'react-redux';
import { useDeleteEnvironmentMutation } from '../../../../services/environments';
import { environmentAction } from '../../../../store/environment-slice';
import { menuEnvironmentAction } from '../../../../store/menu-environment-slice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EnvDeleteDialog = () => {
  const dispatch = useDispatch();
  const envState = useSelector(state => state.environment);
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const envName = menuEnvironment.selected ? menuEnvironment.selected.name : '';
  const [deleteEnvironment, { isLoading }] = useDeleteEnvironmentMutation();

  const onSelection = async (doDelete) => {
    if (doDelete === true && menuEnvironment.selected) {
      const envId = menuEnvironment.selected.id;
      await deleteEnvironment(envId);
    
      if (envId == envState.selected.id) {
        dispatch(environmentAction.setSelectedEnvironment(null));
      }
    }

    dispatch(menuEnvironmentAction.closeDelete());
    dispatch(menuEnvironmentAction.setSelected(null));
    dispatch(menuEnvironmentAction.openList());
  };

  return (
    <div>
      <Dialog
        open={ menuEnvironment.delete ?? false }
        onClose={ () => onSelection(false) }
        scroll={ 'body' }
        fullWidth={ true }
      >
        <DialogTitle id="env-dialog-title">Delete Environment?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the environment { envName }?
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

export default EnvDeleteDialog;
