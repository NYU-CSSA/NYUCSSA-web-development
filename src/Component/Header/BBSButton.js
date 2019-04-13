import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BBSButton = withStyles({
  root: {
    width: '120%',
    height: '200%',
    fontSize: '14px',
    padding: '5px 15px',
    background: 'rgb(113,9,181)',
  },
  label: {
    color: 'white',
  },
  li: {
    textTransform: 'capitalize',
    display: 'block',
  }
})(Button);

export default function ClassesShorthand() {
  return <BBSButton>Forum</BBSButton>;
}
/*
problem: too close to the text, padding doesn't work
<FontAwesomeIcon icon="location-arrow"/>
*/
