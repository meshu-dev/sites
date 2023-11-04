import styles from './EnvRow.module.scss';
import Button from '@mui/material/Button';

const EnvRow = ({ category, onEditFtn, onDeleteFtn }) => {
  return (
    <div className={ styles['env-row'] }>
      <div className={ styles['env-row-name'] }>{ category['name'] }</div>
      <Button
        className={ styles['env-row-link'] }
        onClick={ () => onEditFtn(category['id']) }>
          Edit
      </Button>
      <Button
        className={ styles['env-row-link'] }
        onClick={ () => onDeleteFtn(category['id']) }>
          Delete
      </Button>
    </div>
  );
};

export default EnvRow;