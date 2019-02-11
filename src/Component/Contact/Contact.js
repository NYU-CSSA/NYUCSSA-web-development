import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import db from "../../DataBase/FirebaseConfig"
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Contact extends React.Component {

  state = {
    email:"",
    text:"",
    open:false
  }



  change = (e) =>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit = (e) =>{
    e.preventDefault()
    var {email,text} = this.state 
    db.ref("message").push({
      email,
      text
    }).then(()=>{
      this.setState({open:true,email:"",text:""})
      setTimeout(()=>{      this.setState({open:false})},3000)
    
    })
  }

  render(){
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Snackbar
        anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
        open={this.state.open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}

        message={<span id="message-id">Email Send :)</span>}
      />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
          <i class="material-icons">
          email
          </i>
          </Avatar>
       
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input value={this.state.email} onChange={this.change} name="email" autoComplete="email"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Message</InputLabel>
              <Input value={this.state.text} onChange={this.change} name="text" autoComplete="email" multiline rows={10} />
            </FormControl>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send
            </Button>
          </form>
        </Paper>
      </main>
    );
  }

 
}



export default withStyles(styles)(Contact);