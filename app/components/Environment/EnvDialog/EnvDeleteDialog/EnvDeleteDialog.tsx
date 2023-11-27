import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useDeleteCategoryMutation } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { categoryAction } from '@/app/store/category-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import StatusMsg from '@/app/components/Layout/StatusMsg/StatusMsg'

const EnvDeleteDialog = () => {
  const dispatch = useAppDispatch()
  const envState = useAppSelector(state => state.category)
  const menuCategory = useAppSelector(state => state.menuCategory)
  const envName = menuCategory.selected ? menuCategory.selected.name : '';
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const onSelection = async (doDelete) => {
    if (doDelete === true && menuCategory.selected) {
      const categoryId: number = menuCategory.selected.id;
      const response = await deleteCategory(categoryId);
    
      const hasError = (response['data'] && response['data']['error']) ? true : false;

      if (hasError === true) {
        setStatusMsg(response);
        return;
      }

      if (categoryId == envState.selected.id) {
        dispatch(categoryAction.setSelected(null));
      }
    }

    dispatch(menuCategoryAction.closeDelete());
    dispatch(menuCategoryAction.setSelected(null));
    dispatch(menuCategoryAction.openList());
  };

  const setStatusMsg = (response) => {
    if (response['data'] && response['data']['error']) {
      const errorMsg = response['data']['error'];

      const params = {
        type: 'error',
        messages: [errorMsg]
      };

      dispatch(mainAction.setStatusMsg(params));
    }
  };

  return (
    <div>
      <Dialog
        open={ menuCategory.delete ?? false }
        onClose={ () => onSelection(false) }
        scroll={ 'body' }
        fullWidth={ true }>
        <DialogTitle id="env-dialog-title">Delete Category?</DialogTitle>
        <DialogContent>
          <StatusMsg />
          <DialogContentText>
            Are you sure you want to delete the category { envName }?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={ isLoading }
            onClick={ () => onSelection(true) }>
            Yes
          </Button>
          <Button
            onClick={ () => onSelection(false) }>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EnvDeleteDialog;
