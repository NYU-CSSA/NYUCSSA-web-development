import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Img from "../image/bg/1.jpg"

const ActivityData = {
    event:{
        title:"活动名称",
        content:`
            哈哈哈哈哈哈哈
        `,
        imgURL:Img
    },
    images:[
        Img,
        Img,
        Img,
    ],
    OtherActivity:[
        {
            imgURL:Img,
            imgLink:""
        },{
            imgURL:Img,
            imgLink:""
        },{
            imgURL:Img,
            imgLink:""
        }
    ]
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding:20
  },
  img:{
    width:"100%",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
});

class Activity extends React.Component{

  componentWillMount(){
      this.setState({
          activity:ActivityData
      })
  }

  state = {
    activity:""
  }

  render(){

    const { classes } = this.props;
    const {activity} = this.state
    const {event,images,OtherActivity} = activity

    return (
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} md={6}>
              <Paper className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    {event.title}
                </Typography>
    
                <Typography variant="body1" gutterBottom>
                    {event.content}
                </Typography>
    
                <img src={event.imgURL} className={classes.img} alt="img" />
              </Paper>
            </Grid>

            <Grid item xs={12}  md={6}>
              <Grid container spacing={16}>
                {images.map((image,index)=>{
                    return  <Grid item xs={6} key={index}>
                                <Paper className={classes.paper}>       
                                    <img src={image} className={classes.img} alt='img' />
                                </Paper>
                            </Grid>
                })
                }
              </Grid>
            </Grid>
            
            <Grid item xs={12}>
              <Paper className={classes.paper}>其他活动</Paper>
            </Grid>

             {OtherActivity.map((image,index)=>{
                    return  <Grid item xs={12} md={4}>      
                                <Paper className={classes.paper} key={index}>       
                                    <img src={image.imgURL} className={classes.img} alt='img' />
                                </Paper> 
                            </Grid>
              })
             }
              
          </Grid>
        </div>
      );

  }
}

export default withStyles(styles)(Activity);
