import * as React from 'react';
import {Card} from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia} from '@mui/material';
import {Typography} from '@mui/material';
import { CardActionArea } from '@mui/material';

export default function ServicesCard({feature , text , img}) {
  return (
    <Card sx={{ maxWidth: 345  , maxHeight:390}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={img}
          alt=""
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" >
            {feature}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
