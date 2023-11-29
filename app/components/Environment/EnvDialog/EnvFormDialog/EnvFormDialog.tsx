import { useState, useEffect } from 'react'
import { useAppSelector } from '@/app/hooks'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import StatusMsg from '@/app/components/Layout/StatusMsg/StatusMsg'
import styles from './EnvFormDialog.module.scss'
import { InputEvent } from '@/app/types'

type Props = {
  title: string,
  onSaveFtn: (envName: string) => void,
  onCloseFtn: () => void
}

const EnvFormDialog = ({ title, onSaveFtn, onCloseFtn }: Props) => {
  const menuCategory = useAppSelector(state => state.menuCategory)
  const [envName, setEnvName] = useState('')

  const isLoading = false

  const handleInputChange = (event: InputEvent) => {
    const value = event.target.value
    setEnvName(value)
  }

  const onSaveClick = async () => {
    await onSaveFtn(envName)
  };

  const onCloseClick = () => {
    onCloseFtn()
  };

  useEffect(() => {
    const name = menuCategory.selected ? menuCategory.selected.name : ''
    setEnvName(name)
  }, [menuCategory.selected])

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
            label="Category"
            name="category"
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