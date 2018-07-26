import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from './Mui';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './History';
import configureStore from './Store';

import Contacts from './Contact/Contacts';

import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={muiTheme}>
          <ConnectedRouter history={history}>
            <Switch className="route-container">
              <Route path="/contacts" component={Contacts} />
              <Redirect to="/contacts" />
            </Switch>
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
