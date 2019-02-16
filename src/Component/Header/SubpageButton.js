import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const SubpageButton = withStyles({
  root: {
    //fontFamily:'Lora, serif',
    // fontWeight: '800',
    fontSize: '15px',
    marginLeft: '15px',
    marginRight: '15px',
  },
  label: {
    color: 'black',
  },
})(Button);

export default function ClassesShorthand(props) {
  return <SubpageButton>{props.content}</SubpageButton>;
}
