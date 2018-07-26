import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getRandomContact} from './Contact/action';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

class Header extends Component {

  render() {

    return (
      <AppBar position="sticky">
          <Toolbar>
            <div>
              <img src={`${process.env.PUBLIC_URL}/intuit-logo.png`} alt="intuit logo" height={26} />
            </div>
            <ButtonWrapper>
              <Button style={{color:'#fff'}} onClick={this.props.actions.getRandomContact}>
                Add random
              </Button>
            </ButtonWrapper>
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
    actions: bindActionCreators({getRandomContact}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
