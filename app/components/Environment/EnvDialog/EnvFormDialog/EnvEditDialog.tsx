import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useEditCategoryMutation } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import EnvFormDialog from './EnvFormDialog'
import { ApiResponse } from '@/app/types'
import { getValidationStatusMsg } from '@/app/utils/form'

const EnvEditDialog = () => {
  const dispatch = useAppDispatch()
  const menuCategory = useAppSelector(state => state.menuCategory)
  const [editCategory, { isLoading }] = useEditCategoryMutation()

  const onSaveClick = async (envName: string) => {
    dispatch(mainAction.clearStatusMsg())

    let params = {
      id: menuCategory.selected?.id,
      name: envName
    }
    const response: ApiResponse = await editCategory(params) as ApiResponse

    if (response.data) {
      dispatch(menuCategoryAction.closeEdit())
      dispatch(menuCategoryAction.openList())
    } else {
      setStatusMsg(response)
    }
  }

  const setStatusMsg = (response: ApiResponse) => {
    const statusMsg = getValidationStatusMsg(response)

    if (statusMsg) {
      dispatch(mainAction.setStatusMsg(statusMsg))
    }
  }

  const onCloseClick = () => {
    dispatch(menuCategoryAction.closeEdit())
    dispatch(menuCategoryAction.setSelected(null))
    dispatch(menuCategoryAction.openList())
  }

  const editForm = (<EnvFormDialog
                      title={ 'Edit Category' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />)

  return (
    <div>
      { menuCategory.edit ? editForm : null }
    </div>
  )
}

export default EnvEditDialog;