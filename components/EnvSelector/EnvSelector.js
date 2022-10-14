import { useState, useEffect } from 'react';
import apiHook from '../apiHook.js';

import EnvSelectorDropdown from './EnvSelectorDropdown';

const EnvSelector = ({ onEnvChangeFtn }) => {
  const environments = [];
  const [selectedEnv, setSelectedEnv] = useState('');
  const { data, error } = apiHook('environments');

  const onOptionChange = (event) => {
    const envId = event.target.value;
    setSelectedEnv(envId);
  };

  useEffect(() => {
    onEnvChangeFtn(selectedEnv);
  }, [selectedEnv]);
  
  if (data) {
    environments = data.data;

    if (!selectedEnv && environments.length > 0) {
      setSelectedEnv(environments[0]['id']);
    }

    return (
      <EnvSelectorDropdown
        selectedEnv={ selectedEnv }
        environments={ environments }
        onOptionChange={ onOptionChange } />
    );
  }
  return (null);
}

export default EnvSelector;
