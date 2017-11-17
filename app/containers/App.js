import React, { Component } from 'react';
import type { Children } from 'react';
import { MuiThemeProvider, createMuiTheme} from 'material-ui/styles';

import {cyan, teal} from 'material-ui/colors'
import SideBarNav from '../components/SideBarNav';


const theme = createMuiTheme({
  palette: {
    primary: cyan, // Purple and green play nicely together.
    secondary: teal
  },
  overrides: {
    MuiButton: {
      // Name of the styleSheet
      root: {
        // Name of the rule
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
      },
    }
  }
});


export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="app">
          <SideBarNav />
          <div className="main-content">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
