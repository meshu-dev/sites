import { useState } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';

const actions = [
  { key: 'settings', name: 'Settings', icon: <SettingsIcon /> },
  { key: 'environments', name: 'Environments', icon: <StorageIcon /> },
  { key: 'sites', name: 'Sites', icon: <WebIcon /> }
];

const Menu = ({ onClickFtn }) => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonClick = (key) => {
    onClickFtn(key);
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
