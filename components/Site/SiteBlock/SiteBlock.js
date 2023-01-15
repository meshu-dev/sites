import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardMedia,
  Typography
} from '@mui/material';
import { mainAction } from '@/store/main-slice';
import { menuSiteAction } from '@/store/menu-site-slice';
import styles from './SiteBlock.module.scss';

const SiteBlock = ({ site }) => {
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.main);

  const onEdit = () => {
    dispatch(mainAction.clearStatusMsg());
    dispatch(menuSiteAction.setSelected(site));

    dispatch(menuSiteAction.openEdit());
  };

  const onDelete = () => {
    dispatch(menuSiteAction.setSelected(site));
    dispatch(menuSiteAction.openDelete());
  };

  return (
    <div className={ styles['site-block-wrapper'] }>
      <Card className={ styles['site-block'] }>
        <CardActionArea className={ styles['site-block-link'] } href={ site.url } target="_blank">
          <CardMedia
            className={ styles['site-block-img'] }
            component="img"
            image={ site.icon.url }
            alt={ site.icon.name }
          />
          <CardContent className={ styles['site-block-content'] }>
            <span>{ site['name'] }</span>
            <Typography variant="body2" color="text.secondary">
              { site['url'] }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: mainState.isEditMode ? 'block' : 'none' }}>
          <Button
            size="small"
            color="primary"
            onClick={ onEdit }>
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={ onDelete }>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default SiteBlock;
