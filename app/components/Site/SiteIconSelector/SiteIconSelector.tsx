import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useGetIconsQuery } from '@/app/services/icons'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import styles from './SiteIconSelector.module.scss'
import Image from 'next/image'

const SiteIconSelector = ({ selectedIconId }) => {
  const dispatch = useAppDispatch()
  const menuSite = useAppSelector(state => state.menuSite)
  let { data: icons = [] } = useGetIconsQuery()

  const onIconClick = (iconId, event) => {
    removeSelection(event)
    addSelection(event)

    let selectedIcon = icons.find(icon => icon.id == iconId)
    dispatch(menuSiteAction.setSelectedIcon(selectedIcon))
  }

  const addSelection = (event) => {
    const iconItemEl = event.target.parentElement.parentElement
    iconItemEl.classList.add(styles['icon-selecteditem'])
  }

  const removeSelection = (event) => {
    const iconListEl = event.target.parentElement.parentElement.parentElement
    const iconItemListEl = iconListEl.children

    for (const iconItemEl of iconItemListEl) {
      iconItemEl.classList.remove(styles['icon-selecteditem'])
    }
  }

  console.log('selectedIconId', selectedIconId)

  return (
    <ImageList
      id={ styles['icon-list'] }
      cols={ 5 } rowHeight={ 80 }>
      {
        icons.map((icon, index) => {
          let classNames = styles['icon-item'];

          if (
            icon.id == selectedIconId ||
            (selectedIconId == 0 && index == 0)
          ) {
            classNames += ` ${styles['icon-selecteditem']}`;
          }

          return (<span
            key={ `icon-image-${icon.id}` }
            className={ classNames }
            onClick={ (event) => onIconClick(icon.id, event) }>
            <ImageListItem>
              <Image
                src={ icon.url }
                alt={ icon.name }
                loading="lazy"
                className={ styles['icon-image'] }
              />
            </ImageListItem>
          </span>)
        })
      }
    </ImageList>
  );
};

export default SiteIconSelector;
