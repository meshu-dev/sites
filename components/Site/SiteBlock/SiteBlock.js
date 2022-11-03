import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import styles from './SiteBlock.module.scss';

const SiteBlock = ({ site }) => {
  return (
    <div className={ styles['site-block-wrapper'] }>
      <Card className={ styles['site-block'] }>
        <CardActionArea className={ styles['site-block-link'] } href={ site['url'] } target="_blank">
          <CardMedia
            className={ styles['site-block-img'] }
            component="img"
            image="https://mui.com/static/images/cards/live-from-space.jpg"
            alt="green iguana"
          />
          <CardContent className={ styles['site-block-content'] }>
            <Typography gutterBottom variant="subtitle2">
              { site['name'] }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              { site['url'] }
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ display: 'none' }}>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default SiteBlock;
