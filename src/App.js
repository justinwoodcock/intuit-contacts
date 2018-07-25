import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from './Mui';

import Contacts from './Contact/Contacts';

import './App.css';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Router>
          <Switch className="route-container">
            <Route path="/contacts" component={Contacts} />
            <Redirect to="/contacts" />
          </Switch>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
