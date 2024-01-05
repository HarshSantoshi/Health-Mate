import * as React from 'react';
import {CardActions} from '@mui/material';
import {Button} from '@mui/material';
import {Card} from '@mui/material';
import {CardContent} from '@mui/material';
import {CardMedia} from '@mui/material';
import {Typography} from '@mui/material';

export default function DoctorCard({props}) {
  return (
    <Card sx={{  minWidth: 250 , margin:1 }}>
      <CardMedia
        sx={{ height: 200 }}
        image="https://th.bing.com/th/id/OIP.EC8IdP218TS7ZE8YahNarQHaLG?pid=ImgDet&w=192&h=288&c=7&dpr=1.5"
        title="doctor"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{color:"black" , fontSize:"16px"}}>Specialization</span>: {props.specialization}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{color:"black" , fontSize:"16px" }}>Fees</span>:Rs {props.fees}
       
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <span style={{color:"black" , fontSize:"16px"}}>Rating</span>: {props.rating}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large">Take Appointment</Button>
      </CardActions>
    </Card>
  );
}