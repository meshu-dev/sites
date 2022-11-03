import { useSelector, useDispatch } from 'react-redux';
import { useGetEnvironmentsQuery } from '../../../../services/environments';
import { menuAction } from '../../../../store/menu-slice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EnvRow from '../EnvRow/EnvRow';
//import EnvDialogAction from '../EnvDialogAction';

const EnvListDialog = () => {
  const dispatch = useDispatch();
  const menu = useSelector(state => state.menu);
  const menuEnvironment = menu.items.environments ?? null;
  const { data: environments = [] } = useGetEnvironmentsQuery();
  //const action = EnvDialogAction;

  const setEnv = (envId) => {
    let selectedEnv = environments.filter(env => env.id == envId);
    selectedEnv = selectedEnv[0] ? selectedEnv[0] : null;

    dispatch(menuAction.setSelectedEnvironment(selectedEnv));
  }

  const onEdit = (envId) => {
    setEnv(envId);
    dispatch(menuAction.closeEnvironmentList());
    dispatch(menuAction.openEnvironmentEdit());
  };

  const onDelete = (envId) => {
    setEnv(envId);
    dispatch(menuAction.closeEnvironmentList());
    dispatch(menuAction.openEnvironmentDelete());
  };

  const onCloseClick = () => {
    dispatch(menuAction.closeEnvironmentList());
    dispatch(menuAction.setItemAsClosed('environments'));
  };

  const envElements = [];

  if (environments) {
    for (const env of environments) {
      envElements.push(
        <EnvRow
          key={ env.id }
          environment={ env }
          onEditFtn={ () => onEdit(env.id) }
          onDeleteFtn={ () => onDelete(env.id) } />
      );
    }
  }

  return (
    <div>
      <Dialog
        open={ menuEnvironment.list ?? false }
        onClose={ onCloseClick }
        scroll={ 'body' }
        fullWidth={ true }
      >
        <DialogTitle id="env-dialog-title">Edit Environments</DialogTitle>
        <DialogContent>
          { envElements }
        </DialogContent>
        <DialogActions>
          <Button onClick={ onCloseClick }>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EnvListDialog;
