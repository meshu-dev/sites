import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { mainAction } from '@/app/store/main-slice'
import {
  Tooltip,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import EditOffIcon from '@mui/icons-material/EditOff'
import styles from './EditButton.module.scss'

const MenuButton = () => {
  const dispatch = useAppDispatch()
  const mainState = useAppSelector(state => state.main)
  const isEditMode = mainState.isEditMode

  const buttonClick = () => {
    dispatch(mainAction.toggleEditMode())
  }

  const editBtn = <EditIcon fontSize="inherit" />;
  const viewBtn = <EditOffIcon fontSize="inherit" />;

  return (
    <div id={ styles['edit-button-wrapper'] }>
      <Tooltip title={ isEditMode ? 'View mode' : 'Edit mode' }>
        <IconButton
          color="primary"
          aria-label="Edit mode"
          size="large"
          onClick={ buttonClick }>
            { isEditMode ? viewBtn : editBtn }
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default MenuButton
