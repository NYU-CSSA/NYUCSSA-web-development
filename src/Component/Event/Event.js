import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button"
import db from "../../DataBase/FirebaseConfig"
import Loader from "../Loading"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,

  },
  img:{
      width:"100%", 
    
      overflow:"hidden"
  }
});

class Event extends React.Component{

    componentWillMount(){
        db.ref("Event").once("value").then((snapshot)=>{
          var HomeData = snapshot.val().data
          this.setState({events:HomeData,loading:false})
          console.log(this.state)
        })
    }

    state = {
        events:"",
        loading:true
    }

    render(){
        if(this.state.loading){
            return <Loader />
        }else{
            const { classes } = this.props;
            return (
                <div className={classes.root}>
                    {this.state.events.map((event,index)=>{
                        return <Grid container spacing={0} key={index}>
                                <Grid item xs={12} md={6} >
                                    <Paper className={classes.paper} style={{padding:50}}>
                                        <Typography component="h2" variant="h4" gutterBottom left>
                                            {event.title}
                                        </Typography>

                                        <Typography component="h6" variant="h6" gutterBottom left style={{fontSize:25,color:"grey"}}>
                                            {event.date}
                                        </Typography>
        
                                        <Typography variant="body1" style={{fontSize:20}} PgutterBottom>
                                            {event.content}
                                        </Typography>
        
                                        <Typography component="h2" variant="h4" gutterBottom>
                                            <a target="_blank" href={event.buttonURL} style={{padding:0,color:"purple"}} rel="noopener noreferrer">
                                                <Button variant="outlined" style={{padding:15,marginTop:15,color:"purple",fontSize:20}} >{event.buttonText}</Button>
                                            </a>
                                        </Typography>
                                    </Paper>
                                </Grid>
        
                                <Grid item xs={12} md={6} center>
                                    <Paper className={classes.paper}>
                                        <img src={event.img} className={classes.img} alt={`${event.buttonText}`}/>
                                    </Paper>
                                </Grid>
                            </Grid>
                    })}
                </div>)
        }
  
  
   
    }
}


export default withStyles(styles)(Event);
