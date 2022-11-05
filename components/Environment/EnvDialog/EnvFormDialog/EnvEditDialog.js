import { useSelector, useDispatch } from 'react-redux';
import { useEditEnvironmentMutation } from '../../../../services/environments';
import { menuEnvironmentAction } from '../../../../store/menu-environment-slice';
import EnvFormDialog from './EnvFormDialog';

const EnvEditDialog = () => {
  const dispatch = useDispatch();
  const menuEnvironment = useSelector(state => state.menuEnvironment);
  const [editEnvironment, { isLoading }] = useEditEnvironmentMutation();

  const onSaveClick = async (envName) => {
    const params = {
      id: menuEnvironment.selected.id,
      name: envName
    };
    await editEnvironment(params);

    dispatch(menuEnvironmentAction.closeEdit());
    dispatch(menuEnvironmentAction.openList());
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