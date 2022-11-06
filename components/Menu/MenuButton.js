import { useSelector, useDispatch } from 'react-redux';
import { mainAction } from '../../store/main-slice';
import {
  Box,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';

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
    <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
      <IconButton
        aria-label="Edit mode"
        size="large"
        onClick={ buttonClick }>
          { isEditMode ? viewBtn : editBtn }
      </IconButton>
    </Box>
  );
}

export default MenuButton;
