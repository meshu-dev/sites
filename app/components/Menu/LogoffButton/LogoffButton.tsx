import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { signOut, useSession } from 'next-auth/react'
import {
  Tooltip,
  IconButton
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import styles from './LogoffButton.module.scss'

const LogoffButton = () => {
  return (
    <div id={ styles['logoff-button-wrapper'] }>
      <Tooltip title="Logout">
        <IconButton
          color="primary"
          aria-label="Logout"
          size="large"
          onClick={ () => signOut() }>
            <LogoutIcon fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default LogoffButton;
