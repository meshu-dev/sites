import EditButton from '../EditButton/EditButton';
import LogoffButton from '../LogoffButton/LogoffButton';
import styles from './MenuButtons.module.scss';

const MenuButtons = () => {
  return (
    <div id={ styles['menu-buttons'] }>
      <EditButton />
      <LogoffButton />
    </div>
  );
}

export default MenuButtons;
