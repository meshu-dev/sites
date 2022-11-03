import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { menuAction } from '../../../../store/menu-slice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import styles from './EnvEditDialog.module.scss';

const EnvEditDialog = () => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu);
  const menuEnvironment = menu.items.environments ?? null;
  const [envName, setEnvName] = useState('');

  const handleInputChange = event => {
    const value = event.target.value;
    setEnvName(value);
  }

  const onSaveClick = () => {
    dispatch(menuAction.closeEnvironmentEdit());
    dispatch(menuAction.openEnvironmentList());
  };

  const onCloseClick = () => {
    dispatch(menuAction.closeEnvironmentEdit());
    dispatch(menuAction.openEnvironmentList());
  };

  return (
    <div>
      <Dialog
        open={ menuEnvironment.edit ?? false }
        onClose={ onCloseClick }
        scroll={ 'body' }
        fullWidth={ true }
      >
        <DialogTitle>Edit Environments</DialogTitle>
        <DialogContent id={ styles['env-dialog-content'] }>
          <TextField
                id="env-field"
                label="Environment"
                name="environment"
                value={ menuEnvironment.selected ? menuEnvironment.selected.name : '' }
                onChange={ handleInputChange }
                fullWidth
                required />
        </DialogContent>
        <DialogActions>
          <Button onClick={ onSaveClick }>Save</Button>
          <Button onClick={ onCloseClick }>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnvEditDialog;