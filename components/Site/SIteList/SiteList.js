import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { environmentAction } from '../../../store/environment-slice';
import { useGetEnvironmentSitesQuery } from '../../../services/environments';
import styles from './SiteList.module.scss';
import SiteBlock from '../SiteBlock/SiteBlock';

const SiteList = () => {
  const envState = useSelector(state => state.environment);
  const dispatch = useDispatch();
  const envId = envState.selected ? envState.selected.id : 0;
  let { data: environmentSites = [] } = useGetEnvironmentSitesQuery(envId, { skip: !envId });

  useEffect(() => {
    if (environmentSites.length > 0 && envState.isLoading === true) {
      dispatch(environmentAction.finishLoading());
    }

    console.log('USE FFECT - environmentSites', environmentSites);

  }, [environmentSites]);

  console.log('environmentSites', environmentSites, envId, envState.selected ? envState.selected.id : 0);

  if (environmentSites.length > 0) {
    const siteBlocks = environmentSites.map(
      (site) => {
        return <SiteBlock key={ site.id } site={ site } />
      }
    );
  
    return (
      <div id={styles['site-list']}>
        { siteBlocks }
      </div>
    );
  }
  return (null);
}

export default SiteList; 
