import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Card from "./Card";
import db from "../../DataBase/FirebaseConfig";
import Loader from "../Loading";
import { Fade } from 'react-slideshow-image';

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

//slider

const fadeProperties = {
  duration: 3000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true
}

const imgSize = {
  height: "86.5vh",
  overflow: "hidden",
  width: "100%"
}

const SlideShow = (props) => {
  console.log(props);
  const { slider } = props;
  return (
    <Fade {...fadeProperties}>
      <div className="each-fade">
        <div className="image-container" style={imgSize}>
          <img 
            src={slider[0].imgPath} 
            alt={slider[0].label} 
            style={{width:"100%"}} 
          />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container" style={imgSize}>
          <img 
            src={slider[1].imgPath} 
            alt={slider[1].label} 
            style={{width:"100%"}} 
          />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container" style={imgSize}>
          <img 
            src={slider[2].imgPath} 
            alt={slider[2].label} 
            style={{width:"100%"}} 
          />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container" style={imgSize}>
          <img 
            src={slider[3].imgPath} 
            alt={slider[3].label} 
            style={{width:"100%"}} 
          />
        </div>
      </div>
      <div className="each-fade">
        <div className="image-container" style={imgSize}>
          <img 
            src={slider[4].imgPath} 
            alt={slider[4].label} 
            style={{width:"100%"}} 
          />
        </div>
      </div>
    </Fade>
    );
}

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


  render() {
    if(this.state.loading){
      return <Loader />
    }else{
      const { classes, theme } = this.props;
      const { activeStep,indexData } = this.state;
      const {slider,card} = indexData;
      const maxSteps = slider.length;

    return (
      <div className={classes.root}>
        <Card data={card}/>
        <SlideShow slider={slider}/>
      </div>
    );
    }
    
  }
}



export default withStyles(styles, { withTheme: true })(IndexSlider);
