import styles from './EnvRow.module.scss';
import Button from '@mui/material/Button';

const EnvRow = ({ environment, onEditFtn, onDeleteFtn }) => {
  return (
    <div className={ styles['env-row'] }>
      <div className={ styles['env-row-name'] }>{ environment['name'] }</div>
      <Button
        className={ styles['env-row-link'] }
        onClick={ () => onEditFtn(environment['id']) }>
          Edit
      </Button>
      <Button
        className={ styles['env-row-link'] }
        onClick={ () => onDeleteFtn(environment['id']) }>
          Delete
      </Button>
    </div>
  );
};

export default EnvRow;