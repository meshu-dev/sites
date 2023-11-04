import { useSelector, useDispatch } from 'react-redux';
import { useAddEnvironmentMutation } from '@/app/services/environments';
import { mainAction } from '@/app/store/main-slice';
import { menuEnvironmentAction } from '@/app/store/menu-environment-slice';
import EnvFormDialog from './EnvFormDialog';

export interface Environment {
  name: string
}

const EnvAddDialog = () => {
  const dispatch = useDispatch();
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const [addEnvironment, { isLoading }] = useAddEnvironmentMutation();

  const onSaveClick = async (envName) => {
    dispatch(mainAction.clearStatusMsg());

    const params = { name: envName };

    console.log('client - addEnvironment', params);

    const e: Environment = { name: 'Dev' } 

    const response = await addEnvironment(e);

    console.log('SAVE', response);

    setStatusMsg(response);

    if (response['data']['errors'] == null) {
      onCloseClick();
    }
  };

  const setStatusMsg = (response) => {
    if (response['data']['errors']) {
      const data = response['data']['errors'];
      let messages = [];

      if (data['name']) {
        messages.push(data['name']);
      }

      const params = {
        type: 'error',
        messages: messages
      };

      dispatch(mainAction.setStatusMsg(params));
    }
  };

  const onCloseClick = () => {
    dispatch(menuEnvironmentAction.closeAdd());
    dispatch(menuEnvironmentAction.openList());
  };

  const addForm = (<EnvFormDialog
                      title={ 'Add Environment' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuEnvironment.add ? addForm : null }
    </div>
  );
};

export default EnvAddDialog;
