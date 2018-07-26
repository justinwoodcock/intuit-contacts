import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {push} from 'connected-react-router';
import {storeContacts, removeContact, setContactToEdit} from './action';
import defaultContacts from '../utils/contacts.json';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Header from '../Header';
import AddContact from './AddContact';
import ContactListItem from './ContactListItem';
import EditContact from './EditContact';

class Contacts extends Component {

  componentDidMount() {
    const {contactList, actions} = this.props;
    if (contactList.length === 0) {
      this.props.actions.storeContacts(defaultContacts);
    }
  }

  editContact = (index) => {
    this.props.actions.setContactToEdit(index);
  }

  render() {
    const {contactList} = this.props;

    return (
      <div>
        <Header />
        <div style={{margin: 20}}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  contactList.map((contact, i) => {
                    return (
                      <ContactListItem
                        key={contact.id}
                        contact={contact}
                        removeContact={this.props.actions.removeContact}
                        setContactToEdit={this.editContact}
                        contactIndex={i} />
                    );
                  })
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
        <AddContact />
        <EditContact />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {contactList} = state.contact;
  return {
    ...ownProps,
    contactList
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({push, storeContacts, removeContact,
      setContactToEdit}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
