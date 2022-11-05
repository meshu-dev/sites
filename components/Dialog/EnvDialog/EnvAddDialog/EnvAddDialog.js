import { useSelector, useDispatch } from 'react-redux';
import { useAddEnvironmentMutation } from '../../../../services/environments';
import { menuEnvironmentAction } from '../../../../store/menu-environment-slice';
import EnvFormDialog from '../EnvFormDialog/EnvFormDialog';

const EnvAddDialog = () => {
  const dispatch = useDispatch();
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const [addEnvironment, { isLoading }] = useAddEnvironmentMutation();

  const onSaveClick = async (envName) => {
    const params = {
      name: envName
    };
    await addEnvironment(params);

    onCloseClick();
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