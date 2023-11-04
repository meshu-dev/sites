import { useSelector, useDispatch } from 'react-redux';
import { useAddCategoryMutation } from '@/app/services/categories';
import { mainAction } from '@/app/store/main-slice';
import { menuCategoryAction } from '@/app/store/menu-category-slice';
import EnvFormDialog from './EnvFormDialog';

export interface Category {
  name: string
}

const EnvAddDialog = () => {
  const dispatch = useDispatch();
  const menuCategory = useSelector(state => state.menuCategory);
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const onSaveClick = async (categoryName: string) => {
    dispatch(mainAction.clearStatusMsg());

    const params = { name: categoryName };

    console.log('client - addCategory', params);

    const response = await addCategory(params);

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
    dispatch(menuCategoryAction.closeAdd());
    dispatch(menuCategoryAction.openList());
  };

  const addForm = (<EnvFormDialog
                      title={ 'Add Category' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuCategory.add ? addForm : null }
    </div>
  );
};

export default EnvAddDialog;
