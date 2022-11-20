import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import EnvGroupDialog from '../../Environment/EnvDialog/EnvGroupDialog';
import SiteGroupDialog from '../../Site/SiteDialog/SiteGroupDialog';
import Loader from '../Loader/Loader';
import styles from './Main.module.scss';

export default props => {
  const mainState = useSelector(state => state.main);

  return (
    <div className={ styles.container }>
      <Header />
      <main>
        <EnvGroupDialog />
        <SiteGroupDialog />
        { props.children }
        <Loader />
      </main>
      <Footer />
    </div>
  );
}
