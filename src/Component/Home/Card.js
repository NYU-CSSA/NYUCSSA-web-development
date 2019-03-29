import React from 'react';
import { withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom"

const styles = {
  card: {
    maxWidth: 400,
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    zIndex:5,
    padding:30
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
    color:"#7109b5",
    fontWeight: '450',
  },
  p:{
    paddingTop:20,
    fontSize:15
  },
  button:{
    padding:10,
    color:"#7109b5"
  },
  pos: {
    marginBottom: 12,
  },
};

class IndexCard extends React.Component{
    render(){
        const { classes } = this.props;
       const {title,buttonText,buttonURL} = this.props.data
        return (
          <Card className={classes.card}>
            <CardContent>

              <Typography variant="h4" component="h4" className={classes.title}>
              {title}
              </Typography>

              <Typography component="p" className={classes.p}>
              NYU CSSA全称纽约大学中国学生学者联谊会，是美东地区最大，最权威，最具影响力和知名度的华人学生组织之一。NYU CSSA有着庞大的校友资源,秉承着为华人学生服务的精神，为大家提供着便利与帮助、为大家组织丰富多彩的文艺活动和职业发展活动,在社会各界和学生群体之间架起了一道桥梁.
              </Typography>

            </CardContent>

            <CardActions>
              <Link to={`${buttonURL}`}>
                  <Button size="large" variant="outlined"  className={classes.button}>了解更多活动</Button>
              </Link>
            </CardActions>
          </Card>
        );
      }
}


export default withStyles(styles)(IndexCard);
