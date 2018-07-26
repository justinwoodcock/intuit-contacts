import React, { Component } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';

class ContactListItem extends Component {

  render() {
    const {contact} = this.props;
    const {street, city, state, zip} = contact.location;

    const fullName = `${contact.name.first} ${contact.name.last}`;
    const avatarInitials = `${contact.name.first.charAt(0)}${contact.name.last.charAt(0)}`;
    const avatarStyle = {width:30, height:30};

    return (
      <TableRow>
        <TableCell>
          {
            !contact.picture || contact.picture.length === 0 ?
              <Avatar style={{...avatarStyle, backgroundColor: '#2ca01c', color: '#fff'}}>{avatarInitials}</Avatar> :
              <Avatar alt={fullName} src={contact.picture} style={avatarStyle} />
          }
        </TableCell>
        <TableCell>{fullName}</TableCell>
        <TableCell>{contact.email}</TableCell>
        <TableCell>{contact.phone}</TableCell>
        <TableCell>{`${street} ${city} ${state} ${zip}`}</TableCell>

      </TableRow>
    );
  }
}

export default ContactListItem;
