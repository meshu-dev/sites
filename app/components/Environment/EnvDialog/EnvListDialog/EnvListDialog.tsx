import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '@/app/services/categories';
import { mainAction } from '@/app/store/main-slice';
import { menuCategoryAction } from '@/app/store/menu-category-slice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import EnvRow from '../EnvRow/EnvRow';
//import EnvDialogAction from '../EnvDialogAction';

const EnvListDialog = () => {
  const dispatch = useDispatch();
  const menuCategory = useSelector(state => state.menuCategory);
  const { data: categories = [] } = useGetCategoriesQuery();
  //const action = EnvDialogAction;

  const setEnv = (categoryId: number) => {
    let selectedEnv = categories.filter(category => category.id == categoryId);
    selectedEnv = selectedEnv[0] ? selectedEnv[0] : null;

    dispatch(menuCategoryAction.setSelected(selectedEnv));
  }

  const onAdd = () => {
    dispatch(mainAction.clearStatusMsg());
    dispatch(menuCategoryAction.setSelected(null));

    dispatch(menuCategoryAction.closeList());
    dispatch(menuCategoryAction.openAdd());
  };

  const onEdit = (categoryId: number) => {
    dispatch(mainAction.clearStatusMsg());
    setEnv(categoryId);

    dispatch(menuCategoryAction.closeList());
    dispatch(menuCategoryAction.openEdit());
  };

  const onDelete = (categoryId: number) => {
    dispatch(mainAction.clearStatusMsg());
    setEnv(categoryId);
    
    dispatch(menuCategoryAction.closeList());
    dispatch(menuCategoryAction.openDelete());
  };

  const onCloseClick = () => {
    dispatch(menuCategoryAction.closeList());
  };

  const envElements = [];

  if (categories) {
    for (const category of categories) {
      envElements.push(
        <EnvRow
          key={ category.id }
          environment={ category }
          onEditFtn={ () => onEdit(category.id) }
          onDeleteFtn={ () => onDelete(category.id) } />
      );
    }
  }

  return (
    <Dialog
      open={ menuCategory.list ?? false }
      onClose={ onCloseClick }
      scroll={ 'body' }
      fullWidth={ true }
    >
      <DialogTitle id="env-dialog-title">Categories</DialogTitle>
      <DialogContent>
        { envElements }
      </DialogContent>
      <DialogActions>
        <Button onClick={ onAdd }>Add</Button>
        <Button onClick={ onCloseClick }>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EnvListDialog;
