import apiHook from '../apiHook';
import SiteBlock from './SiteBlock';
import Loader from '../Loader/Loader';

import styles from './site-list.module.scss';

const SiteList = ({ envId }) => {
  if (envId) {
    const { data, error } = apiHook(`environments/${envId}/sites`);
  
    console.log('SiteList - Error', error);
  
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
  return (<Loader />);
}

export default SiteList;
