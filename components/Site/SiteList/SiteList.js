import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mainAction } from '../../../store/main-slice';
import { useGetEnvironmentSitesQuery } from '../../../services/environments';
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
    const siteBlocks = [];

    if (environmentSites.length > 0) {
      siteBlocks = environmentSites.map(
        (site) => {
          return <SiteBlock key={ site.id } site={ site } />
        }
      );
    } else {
      siteBlocks.push(<div id={ styles['site-list-none'] }>No sites available for this environment</div>);
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
