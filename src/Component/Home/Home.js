import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from "./Card"
import db from "../../DataBase/FirebaseConfig"
import Loader from "../Loading"

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height:"87.5vh",
    transition:"all 0.4s",
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
});

class IndexSlider extends React.Component {

  componentWillMount(){
      db.ref("Home").once("value").then((snapshot)=>{
        var HomeData = snapshot.val().data
        this.setState({indexData:HomeData,loading:false})
      })
  }
 
  state = {
    activeStep: 0,
    indexData:"",
    loading:true
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  render() {
    if(this.state.loading){
      return <Loader />
    }else{
      const { classes, theme } = this.props;
    const { activeStep,indexData } = this.state;
    const {slider,card} = indexData
    const maxSteps = slider.length;

    return (
      <div className={classes.root}>
        <Card data={card}/>
        <img
          className={classes.img}
          src={slider[activeStep].imgPath}
          alt={slider[activeStep].label}
        />
        <MobileStepper
          steps={maxSteps}
          variant="text"
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </div>
    );
    }
    
  }
}



export default withStyles(styles, { withTheme: true })(IndexSlider);
