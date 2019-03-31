import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import db from "../../DataBase/FirebaseConfig";
import Loader from "../Loading";
import FilterDate from "./FilterDate.js";
import Moment from 'react-moment';

//it would be better to have font size 18 for body1

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
    minHeight:"45vh",
  },
  img:{
      width:"100%",
      //maxHeight:"40vh",
      overflow:"hidden"
  }
});

class Event extends React.Component{

    componentWillMount(){
        db.ref("Event").once("value").then((snapshot)=>{
          var HomeData = snapshot.val().data;
          //console.log(HomeData);


          HomeData.sort(function(a, b) {
            var date1 = a.date;
            var date2 = b.date;
            var i = 0;
            var found = false;
            while (i < date1.length && !found) {
              if (date1.charAt(i) === date2.charAt(i)) {
                i++;
              } else {
                found = true;
              }
            }
            return date2.charAt(i) -date1.charAt(i);
          });

          this.setState({events:HomeData,displayedEvents: HomeData, loading:false})
          //console.log(this.state.events);
        })
    }

    constructor(props) {
      super(props);
      this.state = {
        events:"",
        displayedEvents:[],
        loading:true,
        filterValue: 0,
      };
      this.handleFilter = this.handleFilter.bind(this);
      this.computeDate = this.computeDate.bind(this);
    }

    handleFilter(event) {
        const value = event.target.value;
        let array = [];
        this.setState({filterValue: event.target.value});
        this.state.events.map((element, index) => {
          if (value === 0) {
            array.push(element);
          } else if (value === 1) {
            const moment = require('moment');
            const now = moment();
            const oldDate = now.subtract(6, 'months');
            const date = moment(element.date);
            if (oldDate.isBefore(date)) {
              array.push(element);
            }
          } else {
            if (element.date.includes(value)) {
              array.push(element);
            }
          }
        })
        this.setState({displayedEvents: array});
    }

    render(){
        if(this.state.loading){
            return <Loader />
        }else{
            const { classes } = this.props;
            return (
                <div className={classes.root}>
                  <FilterDate
                    events = {this.state.events}
                    handleFilter = {this.handleFilter}
                  />
                    {this.state.displayedEvents.map((event,index)=>{
                       //TODO CONDITION LOGIC
                        return <Grid container spacing={0} key={index}>
                                <Grid item xs={12} md={6} >
                                    <Paper className={classes.paper} style={{padding:50}}>
                                        <Typography component="h2" variant="h4" gutterBottom left>
                                            {event.title}
                                        </Typography>

                                        <Typography component="h6" variant="h6" gutterBottom left style={{fontSize:25,color:"grey"}}>
                                            {event.date}
                                        </Typography>

                                        <Typography variant="body1" style={{fontSize:18}} PgutterBottom>
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
