import * as React from 'react';
import { Box } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './EnvSelectorDropdown.module.scss';
import { InputEvent, Category } from '@/app/types'

interface Props {
  selectedEnv: string,
  categories: Category[],
  onOptionChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void
}

const EnvSelectorDropdown = ({ selectedEnv, categories, onOptionChange }: Props) => {
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
