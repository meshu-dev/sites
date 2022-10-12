import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const SiteBlock = ({ envId }) => {
  const [sites, setSites] = React.useState([]);

  //setSelectedEnv(envId);

  console.log('envId', envId);

  useEffect(() => {
    console.log('useEffect logic ran');
    console.log('EFFECT', envId);
  }, [envId]);

  if (!sites.length) {
    return (<div>SITE BLOCK Loading...</div>);
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{ display: 'flex', maxWidth: 345 }}>
        <CardMedia
          sx={{ width: '100px', height: '100px', padding: '15px 0' }}
          component="img"
          image="https://mui.com/static/images/cards/live-from-space.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            http://www.google.co.uk
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: 'none' }}>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}

export default SiteBlock;
