import * as React from 'react';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const EnvSelectorDropdown = ({ selectedEnv, environments, onOptionChange }) => {
  const menuItems = [];

  for (const environment of environments) {
    menuItems.push(
      <MenuItem
        key={ environment['id'] }
        value={ environment['id'] }>
        { environment['name'] }
      </MenuItem>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="envselector-label">Environment</InputLabel>
        <Select
          labelId="envselector-label"
          id="envselector-select"
          value={ selectedEnv }
          label="Environment"
          onChange={ onOptionChange }
        >
          { menuItems }
        </Select>
      </FormControl>
    </Box>
  );
}

export default EnvSelectorDropdown;
