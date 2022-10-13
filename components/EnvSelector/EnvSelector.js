import { useState } from 'react';
import apiHook from '../apiHook.js';

import EnvSelectorDropdown from './EnvSelectorDropdown';

const EnvSelector = ({ onEnvChangeFtn }) => {
  const environments = [];
  const [selectedEnv, setSelectedEnv] = useState('');
  const { data, error } = apiHook('environments');

  const onOptionChange = (event) => {
    const envId = event.target.value;

    setSelectedEnv(envId);
    onEnvChangeFtn(envId);

    console.log('handleChange', `Env Id: ${envId}`);
  };
  
  if (data) {
    environments = data.data;

    if (!selectedEnv && environments.length > 0) {
      const firstEnv = environments[0];

      setSelectedEnv(firstEnv['id']);
      onEnvChangeFtn(firstEnv['id']);
    }

    return (
      <EnvSelectorDropdown
        selectedEnv={ selectedEnv }
        environments={ environments }
        onOptionChange={ onOptionChange } />
    );
  }
  return <div>Loading...</div>
}

export default EnvSelector;
