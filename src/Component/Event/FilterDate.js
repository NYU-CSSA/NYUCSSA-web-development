import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: '10px',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
  },
  button: {
    marginLeft: '40px',
  },
  item: {
    fontSize: '14px',
  },
});

class FilterDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      value: 0,
      events: this.props.events,
      displayedEvents: [],
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  /*
  state = {
    open: false,
    value: 0,
    events: this.props.events,
    displayedEvents: [],
  };
  */

  //toggle the menu
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  //handle clicking on menu items
  handleClick = (event) => {
    this.handleClose(event);
    this.handleFilter(event);
    console.log(event.target.value);
  }

  handleClose = event => {
      if (this.anchorEl.contains(event.target)) {
        return;
      }
      this.setState({ open: false });
    };

  //handleFilter = value => this.props.handleFilter(value);
  handleFilter = event => {
    this.props.handleFilter(event);
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    //console.log(this.state.events);

    return (
      <div className={classes.root}>
        <div>
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggle}
            className={classes.button}
          >
            Filter By Date
          </Button>
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <MenuItem
                        className={classes.item}
                        onClick={this.handleClick}
                        value="1"
                        >Last Six Months</MenuItem>
                      <MenuItem
                        className={classes.item}
                        onClick={this.handleClick}
                        value="2019">
                        2019
                      </MenuItem>
                      <MenuItem
                        className={classes.item}
                        onClick={this.handleClick}
                        value="2018">
                        2018</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
  }
}

FilterDate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilterDate);
