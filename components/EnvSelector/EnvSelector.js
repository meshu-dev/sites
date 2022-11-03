import { useEffect } from 'react';

//import { useGetEnvironmentsQuery } from '../../store/environment-api-slice';
//import apiHook from '../apiHook.js';

import EnvSelectorDropdown from './EnvSelectorDropdown';
import { useGetEnvironmentsQuery } from '../../services/environments';

import { useSelector, useDispatch } from 'react-redux';
import { environmentAction } from '../../store/environment-slice';

const EnvSelector = () => {
  const envState = useSelector(state => state.environment);
  const dispatch = useDispatch();
  const { data: environments = [], isFetching } = useGetEnvironmentsQuery();

  const onOptionChange = (event) => {
    const envId = event.target.value;
    
    let selectedEnv = environments.filter(env => env.id == envId);
    selectedEnv = selectedEnv[0] ?? null;

    if (selectedEnv) {
      dispatch(environmentAction.setSelectedEnvironment(selectedEnv));
      dispatch(environmentAction.startLoading());
    }
  };

  useEffect(() => {
    if (envState.selected == null) {
      dispatch(environmentAction.setSelectedEnvironment(environments[0]));
    }
  }, [environments]);
  
  if (environments.length > 0) {
    return (
      <EnvSelectorDropdown
        selectedEnv={ envState.selected ? envState.selected.id : 0 }
        environments={ environments }
        onOptionChange={ onOptionChange } />
    );
  }
  return (null);
}

export default EnvSelector;
