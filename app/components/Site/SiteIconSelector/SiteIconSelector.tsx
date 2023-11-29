import { useAppDispatch, useAppSelector } from '@/app/hooks'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useGetIconsQuery } from '@/app/services/icons'
import { menuSiteAction } from '@/app/store/menu-site-slice'
import styles from './SiteIconSelector.module.scss'
import Image from 'next/image'
import { ButtonEvent, Icon } from '@/app/types'

type Props = {
  selectedIconId: number
}

const SiteIconSelector = ({ selectedIconId }: Props) => {
  const dispatch = useAppDispatch()
  const menuSite = useAppSelector(state => state.menuSite)
  let { data: icons = [] } = useGetIconsQuery()

  const onIconClick = (iconId: number, event: ButtonEvent) => {
    removeSelection(event)
    addSelection(event)

    let selectedIcon = icons.find((icon: Icon) => icon.id == iconId)
    dispatch(menuSiteAction.setSelectedIcon(selectedIcon))
  }

  const addSelection = (event: ButtonEvent) => {
    const target = event.target as HTMLElement
    const iconItemEl = (target.parentElement as HTMLElement).parentElement

    if (iconItemEl) {
      iconItemEl.classList.add(styles['icon-selecteditem'])
    }
  }

  const removeSelection = (event: ButtonEvent) => {
    const target = event.target as HTMLElement
    const iconItemEl: HTMLElement = (target.parentElement as HTMLElement).parentElement as HTMLElement
    const iconListEl = iconItemEl.parentElement

    if (iconListEl) {
      const iconItemListEl: HTMLCollection = iconListEl.children as HTMLCollection

      /*
      for (const iconItemEl of iconItemListEl) {
        iconItemEl.classList.remove(styles['icon-selecteditem'])
      } */
    }
  }

  console.log('selectedIconId', selectedIconId)

  return (
    <ImageList
      id={ styles['icon-list'] }
      cols={ 5 } rowHeight={ 80 }>
      {
        icons.map((icon, index: number) => {
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
            onClick={ (event: ButtonEvent) => onIconClick(icon.id, event) }>
            <ImageListItem>
              <Image
                src={ icon.url }
                alt={ icon.name }
                loading="lazy"
                className={ styles['icon-image'] }
                fill={ true }
              />
            </ImageListItem>
          </span>)
        })
      }
    </ImageList>
  );
};

export default SiteIconSelector;
