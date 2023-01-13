import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import styles from './StatusMsg.module.scss';

const StatusMsg = () => {
  const main = useSelector(state => state.main);

  if (main.statusMsg == null) {
    return (null);
  }

  const messages = [];

  if (main.statusMsg.messages) {
    for (const index in main.statusMsg.messages) {
      messages.push(
        <div key={ `status-msg-${index}` }>
          { main.statusMsg.messages[index] }
        </div>
      );
    }
  }

  return (
    <div className={ styles['statusmsg'] }>
      <Alert severity={ main.statusMsg.type }>{ messages }</Alert>
    </div>
  );
}

export default StatusMsg;
