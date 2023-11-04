import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategorySitesQuery } from '@/app/services/categories';
import { mainAction } from '@/app/store/main-slice';
import styles from './SiteList.module.scss';
import SiteBlock from '../SiteBlock/SiteBlock';

const SiteList = () => {
  const mainState = useSelector(state => state.main);
  const envState = useSelector(state => state.category);
  const dispatch = useDispatch();
  const envId = envState.selected ? envState.selected.id : 0;
  let { data: categorySites = [] } = useGetCategorySitesQuery(envId, { skip: !envId });

  useEffect(() => {
    if (mainState.isLoading === true) {
      dispatch(mainAction.finishLoading());
    }
  }, [categorySites]);

  if (mainState.isLoading === false) {
    let siteBlocks = [];

    if (categorySites.length > 0) {
      siteBlocks = categorySites.map(
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
            No sites available for this category
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
