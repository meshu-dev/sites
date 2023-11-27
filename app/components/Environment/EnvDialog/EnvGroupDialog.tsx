import EnvListDialog from './EnvListDialog/EnvListDialog'
import EnvAddDialog from './EnvFormDialog/EnvAddDialog'
import EnvEditDialog from './EnvFormDialog/EnvEditDialog'
import EnvDeleteDialog from './EnvDeleteDialog/EnvDeleteDialog'

const EnvGroupDialog = () => {
  return (
    <div>
      <EnvListDialog />
      <EnvAddDialog />
      <EnvEditDialog />
      <EnvDeleteDialog />
    </div>
  )
}

export default EnvGroupDialog
