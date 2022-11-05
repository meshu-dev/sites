import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';

import { menuEnvironmentAction } from '../../store/menu-environment-slice';
import { menuSiteAction } from '../../store/menu-site-slice';

const actions = [
  //{ key: 'settings', name: 'Settings', icon: <SettingsIcon />, action: '' },
  { key: 'environments', name: 'Environments', icon: <StorageIcon /> },
  { key: 'sites', name: 'Sites', icon: <WebIcon />, action: '' }
];

const Menu = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonClick = (key) => {
    if (key === 'environments') {
      dispatch(menuEnvironmentAction.openList());
    } else if (key === 'sites') {
      dispatch(menuSiteAction.toggleWriteMode());
    }
    setOpen(false);
  }

  return (
    <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={ handleClose }
        onOpen={ handleOpen }
        open={ open }
        direction={ 'left' }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={ action.key }
            icon={ action.icon }
            tooltipTitle={ action.name }
            onClick={() => buttonClick(action.key)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default Menu;
