import { useSelector, useDispatch } from 'react-redux';
import { menuAction } from '../../../../store/menu-slice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EnvDeleteDialog = () => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu);
  const menuEnvironment = menu.items.environments ?? null;

  const onSelection = (doDelete) => {
    dispatch(menuAction.closeEnvironmentDelete());
    dispatch(menuAction.openEnvironmentList());
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
            Are you sure you want to delete the environment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={ () => onSelection(true) }>Yes</Button>
          <Button onClick={ () => onSelection(false) }>No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnvDeleteDialog;
