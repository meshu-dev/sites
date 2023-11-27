import { useAppSelector, useAppDispatch } from '@/app/hooks'
import { useGetCategoriesQuery } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import EnvRow from '../EnvRow/EnvRow'
import { Category } from '@/app/types'

const EnvListDialog = () => {
  const dispatch = useAppDispatch();
  const menuCategory = useAppSelector(state => state.menuCategory)
  const { data: categories = [] } = useGetCategoriesQuery()
  //const action = EnvDialogAction;

  const setEnv = (categoryId: number) => {
    const filteredCategories: Category[] = categories.filter((category: Category) => category.id == categoryId)
    const foundCategory: Category | null =  filteredCategories[0] ? filteredCategories[0] : null

    dispatch(menuCategoryAction.setSelected(foundCategory))
  }

  const onAdd = () => {
    dispatch(mainAction.clearStatusMsg());
    dispatch(menuCategoryAction.setSelected(null))

    dispatch(menuCategoryAction.closeList())
    dispatch(menuCategoryAction.openAdd())
  };

  const onEdit = (categoryId: number) => {
    dispatch(mainAction.clearStatusMsg())
    setEnv(categoryId);

    dispatch(menuCategoryAction.closeList())
    dispatch(menuCategoryAction.openEdit())
  };

  const onDelete = (categoryId: number) => {
    dispatch(mainAction.clearStatusMsg())
    setEnv(categoryId);
    
    dispatch(menuCategoryAction.closeList())
    dispatch(menuCategoryAction.openDelete())
  };

  const onCloseClick = () => {
    dispatch(menuCategoryAction.closeList())
  };

  const envElements = [];

  if (categories) {
    for (const category of categories) {
      envElements.push(
        <EnvRow
          key={ category.id }
          category={ category }
          onEditFtn={ () => category.id ? onEdit(category.id) : null }
          onDeleteFtn={ () => category.id ? onDelete(category.id) : null } />
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
