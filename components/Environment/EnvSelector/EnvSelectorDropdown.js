import * as React from 'react';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './EnvSelectorDropdown.module.scss';

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
    <div id={ styles['envselector'] }>
      <FormControl id={ styles['envselector-form'] }>
        <InputLabel id="envselector-label">Environment</InputLabel>
        <Select
          labelId="envselector-label"
          value={ selectedEnv }
          label="Environment"
          onChange={ onOptionChange }
        >
          { menuItems }
        </Select>
      </FormControl>
    </div>
  );
}

export default EnvSelectorDropdown;
