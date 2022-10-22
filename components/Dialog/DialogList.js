import { useState, useEffect } from 'react';
import EnvDialog from './EnvDialog';

const DialogList = ({ action, onActionChangeFtn }) => {
  const [isEnvDialogVisible, setIsEnvDialogVisible] = useState(false);

  const onClose = (action) => {
    if (action === 'environments') {
      setIsEnvDialogVisible(false);
    }

    onActionChangeFtn();

    console.log('onClose');
  };

  useEffect(() => {
    if (action === 'environments') {
      setIsEnvDialogVisible(true);
    } else {
      setIsEnvDialogVisible(false);
    }
  }, [action]);

  return (
    <EnvDialog isVisible={ isEnvDialogVisible } onCloseFtn={ onClose } />
  )
}

export default DialogList
