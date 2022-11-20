import { useSelector, useDispatch } from 'react-redux';
import { mainAction } from '../../../store/main-slice';
import {
  Tooltip,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import styles from './MenuButton.module.scss';

const MenuButton = () => {
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.main);
  const isEditMode = mainState.isEditMode;

  const buttonClick = () => {
    let editMode = isEditMode === true ? false : true;
    dispatch(mainAction.toggleEditMode(editMode));
  }

  const editBtn = <EditIcon fontSize="inherit" />;
  const viewBtn = <EditOffIcon fontSize="inherit" />;

  return (
    <div id={ styles['edit-button-wrapper'] }>
      <Tooltip title={ isEditMode ? 'View mode' : 'Edit mode' }>
        <IconButton
          aria-label="Edit mode"
          size="large"
          onClick={ buttonClick }>
            { isEditMode ? viewBtn : editBtn }
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default MenuButton;
