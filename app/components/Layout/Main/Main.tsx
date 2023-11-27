import { useAppSelector } from '@/app/hooks'
import Header from '@/app/components/Layout/Header/Header'
import Footer from '@/app/components/Layout/Footer/Footer'
import EnvGroupDialog from '@/app/components/Environment/EnvDialog/EnvGroupDialog'
import SiteGroupDialog from '@/app/components/Site/SiteDialog/SiteGroupDialog'
import Loader from '@/app/components/Layout/Loader/Loader'
import styles from '@/app/components/Layout/Main/Main.module.scss'
import { ReactElement, JSXElementConstructor } from 'react'

const Main = (props: { children: ReactElement<any, string | JSXElementConstructor<any>> }) => {
  const mainState = useAppSelector(state => state.main);

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

export default Main