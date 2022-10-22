import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import apiHook from '../apiHook.js';
import EnvRow from './EnvRow';

const EnvDialog = ({ isVisible, onCloseFtn }) => {
  const [showList, setShowList] = useState(true);
  const { data, error } = apiHook('environments');

  const onCloseClick = () => {
    onCloseFtn('environments');
  };

  const envElements = [];

  const onEdit = (envId) => {
    showList(false);
  };

  const onDelete = (envId) => {
    showList(false);
  };

  if (data) {
    const environments = data.data;

    for (const environment of environments) {
      envElements.push(
        <EnvRow
          environment={ environment }
          onEditFtn={ onEdit }
          onDeleteFtn={ onDelete } />
      );
    }
  }

  return (
    <div>
      <Dialog
        open={ isVisible }
        onClose={ onCloseClick }
        scroll={ 'body' }
        fullWidth={ 'lg' }
      >
        <DialogTitle id="env-dialog-title">Edit Environments</DialogTitle>
        <DialogContent>
          { envElements }
        </DialogContent>
        <DialogActions>
          <Button onClick={ onCloseClick }>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EnvDialog;
