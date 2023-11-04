import * as React from 'react';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './EnvSelectorDropdown.module.scss';

const EnvSelectorDropdown = ({ selectedEnv, categories, onOptionChange }) => {
  const menuItems = [];

  for (const category of categories) {
    menuItems.push(
      <MenuItem
        key={ category['id'] }
        value={ category['id'] }>
        { category['name'] }
      </MenuItem>
    );
  }

  return (
    <div id={ styles['envselector'] }>
      <FormControl id={ styles['envselector-form'] }>
        <InputLabel id="envselector-label">Category</InputLabel>
        <Select
          labelId="envselector-label"
          value={ selectedEnv }
          label="Category"
          onChange={ onOptionChange }>
          { menuItems }
        </Select>
      </FormControl>
    </div>
  );
}

export default EnvSelectorDropdown;
