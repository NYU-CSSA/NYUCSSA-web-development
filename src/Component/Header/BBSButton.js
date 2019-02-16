import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const BBSButton = withStyles({
  root: {
    width: '120%',
    height: '200%',
    fontSize: '15px',
    padding: '5px 15px',
    background: '#7109b5',
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
  return <BBSButton>BBS</BBSButton>;
}
