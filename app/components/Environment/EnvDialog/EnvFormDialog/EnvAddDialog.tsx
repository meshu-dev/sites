import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useAddCategoryMutation } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import { menuCategoryAction } from '@/app/store/menu-category-slice'
import EnvFormDialog from './EnvFormDialog'
import { ApiResponse } from '@/app/types'
import { getValidationStatusMsg } from '@/app/utils/form'

const EnvAddDialog = () => {
  const dispatch = useAppDispatch()
  const menuCategory = useAppSelector(state => state.menuCategory)
  const [addCategory, { isLoading }] = useAddCategoryMutation()

  const onSaveClick = async (categoryName: string) => {
    dispatch(mainAction.clearStatusMsg())

    const params = { name: categoryName }
    const response: ApiResponse = await addCategory(params) as ApiResponse

    if (response.data) {
      onCloseClick()
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
    dispatch(menuCategoryAction.closeAdd())
    dispatch(menuCategoryAction.openList())
  }

  const addForm = (<EnvFormDialog
                      title={ 'Add Category' }
                      onSaveFtn={ onSaveClick }
                      onCloseFtn={ onCloseClick } />)

  return (
    <div>
      { menuCategory.add ? addForm : null }
    </div>
  )
}

export default EnvAddDialog
