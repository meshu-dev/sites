import { useSelector, useDispatch } from 'react-redux';
import { useEditEnvironmentMutation } from '@/app/services/environments';
import { mainAction } from '@/app/store/main-slice';
import { menuEnvironmentAction } from '@/app/store/menu-environment-slice';
import EnvFormDialog from './EnvFormDialog';

const EnvEditDialog = () => {
  const dispatch = useDispatch();
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const [editEnvironment, { isLoading }] = useEditEnvironmentMutation();

  const onSaveClick = async (envName) => {
    dispatch(mainAction.clearStatusMsg());

    const params = {
      id: menuEnvironment.selected.id,
      name: envName
    };
    const response = await editEnvironment(params);

    console.log('response', response);

    setStatusMsg(response);

    if (response['data']['errors'] == null) {
      dispatch(menuEnvironmentAction.closeEdit());
      dispatch(menuEnvironmentAction.openList());
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
    dispatch(menuEnvironmentAction.closeEdit());
    dispatch(menuEnvironmentAction.setSelected(null));
    dispatch(menuEnvironmentAction.openList());
  };

  const editForm = (<EnvFormDialog
                      title={ 'Edit Environment' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuEnvironment.edit ? editForm : null }
    </div>
  );
};

export default EnvEditDialog;