import { useState, useEffect } from 'react';
import EnvListDialog from '../EnvDialog/EnvListDialog/EnvListDialog';
import EnvEditDialog from '../EnvDialog/EnvEditDialog/EnvEditDialog';
import EnvDeleteDialog from '../EnvDialog/EnvDeleteDialog/EnvDeleteDialog';

const DialogList = () => {
  return (
    <div>
      <EnvListDialog />
      <EnvEditDialog />
      <EnvDeleteDialog />
    </div>
  )
}

export default DialogList
