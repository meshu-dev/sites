import React from 'react';
import Head from 'next/head'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    /*
    this.setState({
      isLoading: true,
    })
    this.recaptcha.execute() */

    console.log('BIGN!!!', this.state.email, this.state.password);
  }

  render() {
    return (
      <main id="login">
        <Head>
          <title>DevAdmin - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <form onSubmit={ this.handleSubmit }>
          <TextField
              id="email-field"
              className="login-field"
              type="email"
              label="Email"
              name="email"
              value={ this.state.email }
              onChange={ this.handleInputChange }
              fullWidth
              required
              minLength="10"
              maxLength="20" />
          <TextField
            id="password-field"
            className="login-field"
            type="password"
            label="Password"
            name="password"
            value={ this.state.password }
            onChange={ this.handleInputChange }
            fullWidth
            required
            minLength="10"
            maxLength="20" />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type="submit"
              variant="contained">
                Submit
            </Button>
          </Box>
        </form>
      </main>
    )
  }
}
