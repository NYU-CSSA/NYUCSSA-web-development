import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginLeft: theme.spacing.unit * 2,
  },
  chip: {
    marginRight: 10,
    paddingRight: 10,
    fontSize: 15,
  },
  row: {
    marginTop: -10,
    marginBottom: -10,
  },
});

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
    }
    this.filterDate = this.filterDate.bind(this);
  }

  filterDate = num => {
    this.props.filterDate(num);
    this.setState({keyword: ""});
  }

  handleChange = keyword => event => {
    this.setState({ [keyword]: event.target.value });
  };

  filterWord = () => {
    this.props.filterWord(this.state.keyword);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Filter</Typography>
        </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.row}>
          <ListItem>
          <Chip
            label="Last Six Months"
            clickable
            className={classes.chip}
            onClick={() => {this.filterDate(1)}}
          />
          <Chip
            label="2019"
            clickable
            className={classes.chip}
            onClick={() => {this.filterDate(2019)}}
          />
          <Chip
            label="2018"
            clickable
            className={classes.chip}
            onClick={() => {this.filterDate(2018)}}
          />
        </ListItem>
        <ListItem className={classes.row}>
          <TextField
            label="Keyword"
            value={this.state.keyword}
            onChange={this.handleChange('keyword')}
            margin="normal"
            defaultValue=" "
          />
            <Button onClick={this.filterWord}>Enter</Button>
        </ListItem>
        </List>
      </ExpansionPanelDetails>
      </ExpansionPanel>
      </div>
    );
  }

}

Filter.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Filter);
//<TextBox label="Filter By Keyword"/>
/*
<ExpansionPanel>
  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
    <Typography className={classes.heading}>Filter</Typography>
  </ExpansionPanelSummary>
  <ExpansionPanelDetails>
    <Grid container spacing="24">
      <Grid item xs={12}>
        <Chip
          label="Last Six Months"
          clickable
          className={classes.chip}
          onClick={() => {this.filterDate(1)}}
        />
        <Chip
          label="2019"
          clickable
          className={classes.chip}
          onClick={() => {this.filterDate(2019)}}
        />
        <Chip
          label="2018"
          clickable
          className={classes.chip}
          onClick={() => {this.filterDate(2018)}}
        />
      </Grid>
    <Grid item spacing={12}>
      <TextField
        label="Keyword"
        value={this.state.keyword}
        onChange={this.handleChange('keyword')}
        margin="normal"
        defaultValue=" "
      />
        <Button onClick={this.filterWord}>Enter</Button>
    </Grid>

  </Grid>
    </ExpansionPanelDetails>
</ExpansionPanel>
*/
