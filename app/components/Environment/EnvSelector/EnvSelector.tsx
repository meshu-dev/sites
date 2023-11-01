import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EnvSelectorDropdown from './EnvSelectorDropdown';
import { useGetEnvironmentsQuery } from '@/app/services/environments';
import { mainAction } from '@/app/store/main-slice';
import { environmentAction } from '@/app/store/environment-slice';

const EnvSelector = () => {
  const envState = useSelector(state => state.environment);
  const dispatch = useDispatch();
  const { data: environments = [], isFetching } = useGetEnvironmentsQuery();

  const onOptionChange = (event) => {
    const envId = event.target.value;
    
    let selectedEnv = environments.filter(env => env.id == envId);
    selectedEnv = selectedEnv[0] ?? null;

    if (selectedEnv) {
      dispatch(environmentAction.setSelected(selectedEnv));
      dispatch(mainAction.startLoading());
    }
  };

  useEffect(() => {
    if (envState.selected == null) {
      dispatch(environmentAction.setSelected(environments[0]));
    }
  }, [environments]);
  
  if (environments.length > 0) {
    return (
      <EnvSelectorDropdown
        selectedEnv={ envState.selected ? envState.selected.id : '' }
        environments={ environments }
        onOptionChange={ onOptionChange } />
    );
  }
  return (null);
}

export default EnvSelector;
