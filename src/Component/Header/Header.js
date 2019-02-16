import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button"
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Logo from "./logo.png"
import {Link} from "react-router-dom"
import Divider from '@material-ui/core/Divider';
import BBSButton from './BBSButton.js';
import SubpageButton from './SubpageButton.js';
import './index.css';

const styles = theme => ({
  root: {
    width: '100%',
    fontFamily:'Felipa,cursive',
    background:'white',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: 0,
    marginRight: 0,
  },
  title: {
    display: 'none',
    fontWeight: '600',
    fontSize: '20px',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
    marginLeft:'-10px',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'fixed',
    //marginLeft: '10%',
    marginRight: '0%',
    color: 'black',
    fontFamily:'Roboto,san-serif',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'fixed',
      marginRight: '34%',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'fixed',
      marginRight: '50%',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  subpageButton: {
    marginLeft: '40px',
    marginRight: '40px',
  },
  rightButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >

      <Link to="/">
        <MenuItem onClick={this.handleMobileMenuClose}>


             <Button style={{color:"#7109b5"}} >
                Home
              </Button>

        </MenuItem>
    </Link>

        <Link to="/event">
        <MenuItem onClick={this.handleMobileMenuClose}>

             <Button style={{color:"#7109b5"}} >

                Event

              </Button>


        </MenuItem>
        </Link>

        <Link to="/contact">


        <MenuItem onClick={this.handleProfileMenuOpen}>

        <Button style={{color:"#7109b5"}} >
                Contact Us
              </Button>

        </MenuItem>
        </Link>

        <a href="http://cssanyu.org/bbs2/forum.php?mod=forumdisplay&fid=41" target="_blank" rel="noopener noreferrer">
        <MenuItem onClick={this.handleProfileMenuOpen}>
        <Button className="BSS" style={{color:"#7109b5"}} >
                BBS
              </Button>
        </MenuItem>
        </a>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{background:"white"}}>
          <Toolbar>
          <Link to="/">
            <IconButton className={classes.menuButton}  aria-label="Open drawer">

                <img src={Logo} style={{height:"",width:"45px", marginLeft:"30px", marginRight:'10px'}} alt="logo"/>

            </IconButton>
            </Link>
                <Typography className={classes.title} variant="h6" color="inherit" noWrap style={{color:"#7109b5"}} >
                NYU CSSA
             </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>

            <div className={classes.subpageButtons}>
            <Link to="/">
             <SubpageButton content="HOME"></SubpageButton>
            </Link>
            <Link to="/event">
             <SubpageButton content="EVENTS"></SubpageButton>
            </Link>

            <Link to="/contact">
              <SubpageButton content="CONTACT US"></SubpageButton>
            </Link>
            </div>
            </div>

          <div className="rightButton">
            <a href="http://cssanyu.org/bbs2/forum.php?mod=forumdisplay&fid=41" target="_blank" rel="noopener noreferrer">
              <BBSButton></BBSButton>
            </a>
          </div>

            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} style={{color:"purple"}}>
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
