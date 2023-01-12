import Router from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import {
  Tooltip,
  IconButton
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './LogoffButton.module.scss';

const LogoffButton = () => {
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.main);

  const buttonClick = () => {
    localStorage.setItem('isLoggedIn', false);
    Router.push('/login');
  }

  return (
    <div id={ styles['logoff-button-wrapper'] }>
      <Tooltip title="Logout">
        <IconButton
          color="primary"
          aria-label="Logout"
          size="large"
          onClick={ buttonClick }>
            <LogoutIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default LogoffButton;
