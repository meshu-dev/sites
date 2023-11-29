import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { useGetCategoriesQuery, useGetCategorySitesQuery } from '@/app/services/categories'
import { mainAction } from '@/app/store/main-slice'
import styles from './SiteList.module.scss'
import SiteBlock from '../SiteBlock/SiteBlock'
import { Site } from '@/app/types'

const SiteList = () => {
  const dispatch = useAppDispatch()
  const mainState = useAppSelector(state => state.main)
  const envState = useAppSelector(state => state.category)
  const envId = envState.selected ? Number(envState.selected.id) : 0
  let { data: categories = [] } = useGetCategoriesQuery()
  let { data: categorySites = [] } = useGetCategorySitesQuery(envId, { skip: !envId })

  useEffect(() => {
    if (mainState.isLoading === true) {
      dispatch(mainAction.finishLoading())
    }
  }, [dispatch, mainState, categorySites])

  if (mainState.isLoading === false) {
    let siteBlocks = []

    if (categorySites?.length > 0) {
      siteBlocks = categorySites.map(
        (site: Site) => {
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
            { categories?.length > 0 ? 'No sites available for this category' : 'No categories added yet' }
        </div>
      )
    }

    return (
      <div id={ styles['site-list'] }>
        { siteBlocks }
      </div>
    )
  }
  return (null)
}

export default SiteList
