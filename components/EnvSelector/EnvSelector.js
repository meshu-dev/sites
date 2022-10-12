import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSWR from 'swr';

const fetcher = (url, token) => fetch(url, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
}).then((res) => res.json());

const SelectLabels = () => {
  const [selectedEnv, setSelectedEnv] = React.useState('');

  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/environments`;
  const token = '24|Hr4x2kc2MCh3sR9kAEH9ZRJOPSLN120Vqm20dwHU';

  const { data, error } = useSWR([apiUrl, token], fetcher);

  const handleChange = (event) => {
    setSelectedEnv(event.target.value);

    console.log('daaaa', data);
  };
  
  const menuItems = [];

  if (!data) {
    return <div>Loading...</div>
  } else {
    const environments = data.data;

    console.log('DATA', data);

    for (const environment of environments) {
      if (!selectedEnv) {
        setSelectedEnv(environment['id']);
      }

      menuItems.push(
        <MenuItem value={ environment['id'] }>
          { environment['name'] }
        </MenuItem>
      );
    }
  }

  return (
    <div>
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="envselector-label">Environment</InputLabel>
        <Select
          labelId="envselector-label"
          id="envselector-select"
          value={ selectedEnv }
          label="Environment"
          onChange={ handleChange }
        >
          { menuItems }
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectLabels;
