import { useEffect } from 'react';
import apiHook from '../apiHook';
import SiteBlock from './SiteBlock';
import Loader from '../Loader/Loader';

import styles from './site-list.module.scss';

const SiteList = ({ envId, onLoadedFtn }) => {
  if (envId) {
    const { data, error } = apiHook(`environments/${envId}/sites`);

    useEffect(() => {
      onLoadedFtn(data && data.data ? false : true);
    }, [data]);
  
    if (data) {
      const sites = data.data;
      const siteBlocks = sites.map(
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
  }
  return (null);
}

export default SiteList;
