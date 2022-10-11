import React, { Component } from 'react'
import Alert from '@mui/material/Alert'

class ErrorPanel extends Component {
  render() {
    if (this.props.messages) {
      const rows = [];

      for (const message of this.props.messages) {
          rows.push(<Alert severity="error">{ message }</Alert>);
      }
    }
    return ({ rows });
  }
}

export default ErrorPanel
