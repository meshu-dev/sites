import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetEnvironmentSitesQuery } from '@/app/services/environments';
import { mainAction } from '@/app/store/main-slice';
import styles from './SiteList.module.scss';
import SiteBlock from '../SiteBlock/SiteBlock';

const SiteList = () => {
  const mainState = useSelector(state => state.main);
  const envState = useSelector(state => state.environment);
  const dispatch = useDispatch();
  const envId = envState.selected ? envState.selected.id : 0;
  let { data: environmentSites = [] } = useGetEnvironmentSitesQuery(envId, { skip: !envId });

  useEffect(() => {
    if (mainState.isLoading === true) {
      dispatch(mainAction.finishLoading());
    }
  }, [environmentSites]);

  if (mainState.isLoading === false) {
    let siteBlocks = [];

    if (environmentSites.length > 0) {
      siteBlocks = environmentSites.map(
        (site) => {
          return <SiteBlock
                   key={ `site-block-${site.id}` }
                   site={ site } />
        }
      );
    } else {
      siteBlocks.push(
        <div
          key={ 'site-block-none' }
          id={ styles['site-list-none'] }>
            No sites available for this environment
        </div>
      );
    }

    return (
      <div id={ styles['site-list'] }>
        { siteBlocks }
      </div>
    );
  }
  return (null);
}

export default SiteList; 
