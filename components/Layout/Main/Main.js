import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import styles from './Main.module.scss'

export default props => (
  <div className={ styles.container }>
    <Header />
    <main>
      { props.children }
    </main>
    <Footer />
  </div>
)
