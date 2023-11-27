import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useAddCategoryMutation } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import EnvFormDialog from './EnvFormDialog'
import { ApiResponse } from '@/app/types'

const EnvAddDialog = () => {
  const dispatch = useAppDispatch()
  const menuCategory = useAppSelector(state => state.menuCategory)
  const [addCategory, { isLoading }] = useAddCategoryMutation()

  const onSaveClick = async (categoryName: string) => {
    dispatch(mainAction.clearStatusMsg())

    const params = { name: categoryName }

    console.log('client - addCategory', params)

    const response: ApiResponse = await addCategory(params) as ApiResponse

    console.log('SAVE', response)

    setStatusMsg(response)

    if (response.data?.error == null) {
      onCloseClick()
    }
  };

  const setStatusMsg = (response: ApiResponse) => {
    /*
    if (response['data']['errors']) {
      const data = response['data']['errors'];
      let messages = [];

      const environment: Environment = data as Environment

      if (data['name']) {
        messages.push(data['name']);
      }

      const params = {
        type: 'error',
        messages: messages
      };

      dispatch(mainAction.setStatusMsg(params));

      dispatch(mainAction.setStatusMsg(''));
    } */

    dispatch(mainAction.setStatusMsg('Error occurred'))
  }

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
