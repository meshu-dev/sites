import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import StatusMsg from '@/app/components/Layout/StatusMsg/StatusMsg';
//import { mainAction } from '@/store/main-slice';
import styles from './EnvFormDialog.module.scss';

const EnvFormDialog = ({ title, onSaveFtn, onCloseFtn }) => {
  //const dispatch = useDispatch();
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const [envName, setEnvName] = useState('');

  const isLoading = false;

  const handleInputChange = event => {
    const value = event.target.value;
    setEnvName(value);
  }

  const onSaveClick = async () => {
    await onSaveFtn(envName);
  };

  const onCloseClick = () => {
    onCloseFtn();
  };

  useEffect(() => {
    const name = menuEnvironment.selected ? menuEnvironment.selected.name : '';
    setEnvName(name);
  }, [menuEnvironment.selected]);

  // dispatch(mainAction.clearStatusMsg());

  return (
    <div>
      <Dialog
        open={ true }
        onClose={ onCloseClick }
        scroll={ 'body' }
        fullWidth={ true }>
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent id={ styles['env-dialog-content'] }>
          <StatusMsg />
          <TextField
            id="env-field"
            label="Environment"
            name="environment"
            value={ envName }
            onChange={ handleInputChange }
            fullWidth
            required />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={ isLoading }
            onClick={ onSaveClick }>
              Save
          </Button>
          <Button
            onClick={ onCloseClick }>
              Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnvFormDialog;