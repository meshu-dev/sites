import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import styles from './SiteFormDialog.module.scss';

const SiteFormDialog = ({ title, onSaveFtn, onCloseFtn }) => {
  const menuSite = useSelector(state => state.menuSite);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const isLoading = false;

  const handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'name') {
      setName(value);
    }

    if (name === 'url') {
      setUrl(value);
    }
  }

  const onSaveClick = async () => {
    await onSaveFtn({
      name,
      url
    });
  };

  const onCloseClick = () => {
    onCloseFtn();
  };

  useEffect(() => {
    const site = menuSite.selected ? menuSite.selected : null;
    
    if (site) {
      setName(site.name);
      setUrl(site.url);
    } else {
      setName('');
      setUrl('');
    }
  }, [menuSite.selected]);

  return (
    <div className={ styles['env-row'] }>
      <Dialog
        open={ true }
        onClose={ onCloseClick }
        scroll={ 'body' }
        fullWidth={ true }
      >
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent id={ styles['site-dialog-content'] }>
          <TextField
                id="env-field"
                className={ styles['site-dialog-textfield'] }
                label="Name"
                name="name"
                value={ name }
                onChange={ handleInputChange }
                fullWidth
                required />
          <TextField
                id="env-field"
                className={ styles['site-dialog-textfield'] }
                label="Url"
                name="url"
                value={ url }
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

export default SiteFormDialog;