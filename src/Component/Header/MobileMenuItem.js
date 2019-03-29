import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
import MenuItem from '@material-ui/core/MenuItem';

const MobileMenu = withStyles({
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

export default function MobileMenuItem(props) {
  return <Link to={props.link}>
          <MenuItem>
              <MobileMenu>{props.content}</MobileMenu>
          </MenuItem>
        </Link>
}
