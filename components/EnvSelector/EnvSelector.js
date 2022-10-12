import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import { Box } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { apiGet } from '../apiCall.js';

const EnvSelector = ({ onEnvChangeFtn }) => {
  const menuItems = [];
  const [selectedEnv, setSelectedEnv] = React.useState('');
  const { data, error } = apiGet('environments');

  const onOptionChange = (event) => {
    const envId = event.target.value;

    setSelectedEnv(envId);
    onEnvChangeFtn(envId);

    console.log('handleChange', `Env Id: ${envId}`);
  };
  
  if (!data) {
    return <div>Loading...</div>
  } else {
    const environments = data.data;

    console.log('DATA', data);

    for (const environment of environments) {
      if (!selectedEnv) {
        setSelectedEnv(environment['id']);
        onEnvChangeFtn(environment['id']);
      }

      menuItems.push(
        <MenuItem value={ environment['id'] }>
          { environment['name'] }
        </MenuItem>
      );
    }
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

export default EnvSelector;
