import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button"
import db from "../../DataBase/FirebaseConfig"
import Loader from "../Loading"
import FilterDate from "./FilterDate.js"

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
          console.log(HomeData);
          

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
      this.compareDates = this.compareDates.bind(this);
    }

    handleFilter(event) {
        const value = event.target.value;
        let array = [];
        //console.log(event.target.value);
        this.setState({filterValue: event.target.value});
        this.state.events.map((element, index) => {
          if (value === 0) {
            array.push(element);
          } else if (value === 1) {
            //formatting today's date and get the date six months before
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth().toString().length === 2 ? today.getMonth() : "0" + today.getMonth().toString();
            const day = today.getDate().toString().length === 2 ? today.getDate() : "0" + today.getDate().toString();
            const date = year + "-" + month + "-" + day;
            //console.log(date);
            const oldDate = this.computeDate(date);
            if (this.compareDates(oldDate, element.date) > 0) {
              array.push(element);
              //console.log(element.date);
            }
          } else {
            if (element.date.includes(value)) {
              array.push(element);
            }
          }
        })
        //console.log(array);
        this.setState({displayedEvents: array});
        //console.log(this.state.displayedEvents);
    }

    computeDate(date) {
      let year = parseInt(date.slice(0, 4));
      let month = parseInt(date.slice(5, 7));
      let day = parseInt(date.slice(8, 10));
      const months = [
        {month: 1, days: 31},
        {month: 2, days: 28},
        {month: 3, days: 31},
        {month: 4, days: 30},
        {month: 5, days: 31},
        {month: 6, days: 30},
        {month: 7, days: 31},
        {month: 8, days: 31},
        {month: 9, days: 30},
        {month: 10, days: 31},
        {month: 11, days: 30},
        {month: 12, days: 31},
      ];

      let oldD = day;
      let oldM = month - 6;
      console.log(oldM);
      let oldY = year - 1;
      if (oldM < 0) {
        oldM += 12;
        year -= 1;
      }
      months.map(m => {
        if (oldM === m.month) {
          if (oldD > m.days) {
            oldM += 1;
            oldD -= m.days;
          }
        }
      });
      console.log(oldD.length)
      oldD = oldD.length === 2 ? oldD : "0" + oldD;
      oldM = oldM.length === 2 ? oldM : "0" + oldM;
      console.log(oldD);
      const oldDate = oldY + "-" + oldM + "-" + oldD;
      console.log(oldDate);
      return oldDate;
    }

    //return a positive number if date b > date a
    compareDates(a, b) {
      var date1 = a;
      var date2 = b;
      var i = 0;
      var found = false;
      while (i < date1.length && !found) {
        if (date1.charAt(i) === date2.charAt(i)) {
          i++;
        } else {
          found = true;
        }
      }
      //console.log(date1 + " " + date2);
      //console.log(date2.charAt(i) - date1.charAt(i));
      return date2.charAt(i) -date1.charAt(i);
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
