import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

class Header extends Component {

  render() {

    return (
      <AppBar position="sticky">
          <Toolbar>
            <div>
              <img src={`${process.env.PUBLIC_URL}/intuit-logo.png`} height={26} />
            </div>
          </Toolbar>
        </AppBar>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
