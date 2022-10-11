import Header from '../Header/header';
import Footer from '../Footer/footer';

import styles from './layout.module.scss'

export default props => (
  <div className={styles.container}>
    <Header />
    <main>
      {props.children}
    </main>
    <Footer />
  </div>
)
