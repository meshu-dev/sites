import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import StatusMsg from '@/app/components/Layout/StatusMsg/StatusMsg'
import SiteIconSelector from '@/app/components/Site/SiteIconSelector/SiteIconSelector'
import { useGetIconsQuery } from '@/app/services/icons'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import styles from './SiteFormDialog.module.scss'
import { InputEvent } from '@/app/types'

type Props = {
  title: string,
  onSaveFtn: () => void,
  onCloseFtn: () => void
}

const SiteFormDialog = ({ title, onSaveFtn, onCloseFtn }: Props) => {
  const dispatch = useAppDispatch()
  //let { data: icons = [] } = useGetIconsQuery();

  const menuSite = useAppSelector(state => state.menuSite)
  const isLoading = false

  const handleInputChange = (event: InputEvent) => {
    const name = event.target.name
    const value = event.target.value

    if (name === 'name') {
      dispatch(menuSiteAction.setSelectedName(value))
    }

    if (name === 'url') {
      dispatch(menuSiteAction.setSelectedUrl(value))
    }
  }

  const onSaveClick = async () => {
    await onSaveFtn()
  }

  const onCloseClick = () => {
    onCloseFtn()
  }

  /*
  useEffect(() => {
    if (menuSite.selected == null && icons.length > 0) {
      console.log('A2', icons);
      dispatch(menuSiteAction.setSelectedAsNew(icons[0]));
    }
  }, [icons]); 


  if (menuSite.selected === null) {
    return (null);
  } */

  return (
    <div className={ styles['env-row'] }>
      <Dialog
        open={ true }
        onClose={ onCloseClick }
        scroll={ 'body' }
        fullWidth={ true }>
        <DialogTitle>{ title }</DialogTitle>
        <DialogContent id={ styles['site-dialog-content'] }>
          <StatusMsg />
          <TextField
            id="env-field"
            className={ styles['site-dialog-textfield'] }
            label="Name"
            name="name"
            value={ menuSite?.selected?.name }
            onChange={ handleInputChange }
            fullWidth
            required />
          <TextField
            id="env-field"
            className={ styles['site-dialog-textfield'] }
            label="Url"
            name="url"
            value={ menuSite?.selected?.url }
            onChange={ handleInputChange }
            fullWidth
            required />
          <div>Select icon:</div>
          <SiteIconSelector
            selectedIconId={ menuSite?.selected?.icon?.id || 0 } />
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
  )
}

export default SiteFormDialog
