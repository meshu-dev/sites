import { useGetIconsQuery } from '@/services/icons';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styles from './SiteIconSelector.module.scss';

const SiteIconSelector = ({ onSelection }) => {
  let { data: icons = [] } = useGetIconsQuery();

  const onIconClick = (iconId, event) => {
    removeSelection(event);
    addSelection(event);

    onSelection(iconId);
  };

  const addSelection = (event) => {
    const iconItemEl = event.target.parentElement.parentElement;
    iconItemEl.classList.add(styles['icon-selecteditem']);
  };

  const removeSelection = (event) => {
    const iconListEl = event.target.parentElement.parentElement.parentElement;
    const iconItemListEl = iconListEl.children;

    for (const iconItemEl of iconItemListEl) {
      iconItemEl.classList.remove(styles['icon-selecteditem']);
    }
  };

  return (
    <ImageList
      id={ styles['icon-list'] }
      sx={{ width: 500, height: 200 }} cols={ 5 } rowHeight={ 80 }>
      {
        icons.map((icon, index) => {
          let classNames = styles['icon-item'];

          if (index == 0) {
            classNames += ` ${styles['icon-selecteditem']}`;
          }

          return (<span
            key={ `icon-image-${icon.id}` }
            className={ classNames }
            onClick={ (event) => onIconClick(icon.id, event) }>
            <ImageListItem>
              <img
                src={ icon.url }
                srcSet={ icon.url }
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
