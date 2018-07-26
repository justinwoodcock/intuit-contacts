import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {storeContact, setContactToEdit, updateContact} from './action';
import {isEmpty, isNil} from 'ramda';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;

  > div {
    flex: 1;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionLabel = styled.label`
  font-size: 12px;
`;

const initialContactState = {
  firstName: null,
  lastName: null,
  email: null,
  street: null,
  city: null,
  state: null,
  zip: null,
  phone: null,
  picture: null
}

class EditContact extends Component {
  state = {
    ...initialContactState,
    showSnackbar: false
  }

  componentWillUnmount() {
    this.props.actions.setContactToEdit(null);
  }

  onChange = e => this.setState({[e.target.id]: e.target.value});

  ghettoValidation = () => {
    // basic validation testing to verify that all the inputs have a value (except the picture).
    const {firstName, lastName, email, street, city, state, zip, phone, picture} = this.state;
    const contact = {firstName, lastName, email, street, city, state, zip, phone};
    const isValid = Object.keys(contact).every(key => isNil(contact[key]) === true || contact[key].length > 0);
    return isValid;
  }

  updateContact = () => {
    const isValid = this.ghettoValidation();
    const {contact, contactToEdit} = this.props;
    if (isValid === false) {
      // form is not valid so throw a message to the user.
      this.setState({showSnackbar: true});
      return;
    }

    const {firstName, lastName, email, street, city, state, zip, phone, picture} = this.state;
    const _contact = {
      name: {
        first: !firstName ? contact.name.first : firstName,
        last: !lastName ? contact.name.last : lastName
      },
      email: !email ? contact.email : email,
      phone: !phone ? contact.phone : phone,
      location: {
        street: !street ? contact.location.street : street,
        city: !city ? contact.location.city : city,
        state: !state ? contact.location.state : state,
        zip: !zip ? contact.location.zip : zip
      },
      picture: !picture ? contact.picture : picture,
      id: contact.id
    }
    this.props.actions.updateContact({index: contactToEdit, contact: _contact});
    this.props.actions.setContactToEdit(null);
  }

  cancelAddContact = () => {
    this.props.actions.setContactToEdit(null)
    this.setState({...initialContactState});
    this.props.actions.setContactToEdit(null);
  }

  render() {
    const {contactToEdit, contactList, contact} = this.props;
    const {showSnackbar} = this.state;
    const openDialog = isNil(contact) === true ? false : true;
    return (
      <div>
        {
          isNil(contact) === true ? null :
            <div>
              <Dialog
                open={openDialog}
                onClose={e => this.props.actions.setContactToEdit(null)}>
                <DialogTitle id="form-dialog-title">Add Contact</DialogTitle>
                <DialogContent style={{width: 500}}>
                  <DialogContentText style={{marginBottom: 10}}>
                    Enter contact details below.
                  </DialogContentText>
                  <InputContainer>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="firstName"
                      label="First Name *"
                      onChange={this.onChange}
                      defaultValue={contact.name.first} />
                    <TextField
                      margin="dense"
                      id="lastName"
                      label="Last Name *"
                      onChange={this.onChange}
                      defaultValue={contact.name.last} />
                  </InputContainer>
                  <Section>
                    <SectionLabel>Address</SectionLabel>
                    <InputContainer>
                      <TextField
                        margin="dense"
                        id="street"
                        label="Street *"
                        onChange={this.onChange}
                        defaultValue={contact.location.street} />
                      </InputContainer>
                      <InputContainer>
                        <TextField
                          margin="dense"
                          id="city"
                          label="City *"
                          onChange={this.onChange}
                          defaultValue={contact.location.city} />
                        <TextField
                          margin="dense"
                          id="state"
                          label="State *"
                          onChange={this.onChange}
                          defaultValue={contact.location.state} />
                        <TextField
                          margin="dense"
                          id="zip"
                          label="Zip *"
                          onChange={this.onChange}
                          defaultValue={contact.location.zip} />
                    </InputContainer>
                  </Section>
                  <Section>
                    <TextField
                      margin="dense"
                      id="email"
                      label="Email Address *"
                      type="email"
                      fullWidth
                      onChange={this.onChange}
                      defaultValue={contact.email} />
                    <TextField
                      margin="dense"
                      id="phone"
                      label="Phone number *"
                      type="tel"
                      fullWidth
                      onChange={this.onChange}
                      defaultValue={contact.phone} />
                    <TextField
                      margin="dense"
                      id="picture"
                      label="Picture"
                      placeholder="Add a web URL to a picture"
                      type="url"
                      fullWidth
                      onChange={this.onChange}
                      defaultValue={contact.picture} />
                  </Section>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.cancelAddContact} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.updateContact} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
              <Snackbar
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={showSnackbar}
                autoHideDuration={66666000}
                onClose={e => this.setState({showSnackbar: false})}
                message={
                  <div style={{display:'flex', alignItems: 'center'}}>
                    <ErrorIcon style={{marginRight:10}} />
                    <div>Make sure every field marked with an asterisk (*) has a value.</div>
                  </div>
                }
                action={[
                  <IconButton
                    key="close"
                    color="inherit"
                    onClick={e => this.setState({showSnackbar: false})}>
                    <CloseIcon />
                  </IconButton> ]} />
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {contactList, contactToEdit} = state.contact;
  const contact = isNil(contactToEdit) ? null : contactList[contactToEdit];
  return {
    ...ownProps,
    contactList,
    contactToEdit,
    contact
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({storeContact, setContactToEdit, updateContact}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
