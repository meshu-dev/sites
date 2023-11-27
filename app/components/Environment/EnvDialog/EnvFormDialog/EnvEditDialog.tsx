import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEditCategoryMutation } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import EnvFormDialog from './EnvFormDialog'
import { ApiResponse } from '@/app/types'

const EnvEditDialog = () => {
  const dispatch = useAppDispatch()
  const menuCategory = useAppSelector(state => state.menuCategory)
  const [editCategory, { isLoading }] = useEditCategoryMutation()

  const onSaveClick = async (envName: string) => {
    dispatch(mainAction.clearStatusMsg())

    let params = {
      id: menuCategory.selected?.id,
      name: envName
    };
    const response: ApiResponse = await editCategory(params) as ApiResponse

    console.log('response', response)

    setStatusMsg(response)

    if (response.data?.error == null) {
      dispatch(menuCategoryAction.closeEdit())
      dispatch(menuCategoryAction.openList())
    }
  };

  const setStatusMsg = (response: ApiResponse) => {
    /*
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

      dispatch(mainAction.setStatusMsg(params))
    } */

    dispatch(mainAction.setStatusMsg('Error occurred'))
  }

  const onCloseClick = () => {
    dispatch(menuCategoryAction.closeEdit())
    dispatch(menuCategoryAction.setSelected(null))
    dispatch(menuCategoryAction.openList())
  };

  const editForm = (<EnvFormDialog
                      title={ 'Edit Category' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />);

  return (
    <div>
      { menuCategory.edit ? editForm : null }
    </div>
  );
};

export default EnvEditDialog;