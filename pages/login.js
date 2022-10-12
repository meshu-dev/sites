import React from 'react';
import Head from 'next/head'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorPanel from '../components/ErrorPanel/ErrorPanel';
import Router from 'next/router';
import AuthService from '../services/AuthService';
import { apiPost } from '../components/apiCall.js';

export default class LoginPage extends React.Component {
  //const { data, error } = apiPost('auth/login', params);

  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      messages: []
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

  handleSubmit = async (event) => {
    event.preventDefault()

    const params = {
      email: this.state.email,
      password: this.state.password
    };

    const authService = new AuthService();
    const response = await authService.login(params);

    

    //let data = '';

    //console.log('AuthService response', data);

    Router.push('/');
  }

  render() {
    return (
      <main id="login">
        <Head>
          <title>DevAdmin - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <form onSubmit={ this.handleSubmit }>
          <h1>DevAdmin Login</h1>
          <ErrorPanel />
          <TextField
              id="email-field"
              className="login-field"
              type="email"
              label="Email"
              name="email"
              value={ this.state.email }
              onChange={ this.handleInputChange }
              fullWidth
              required />
          <TextField
            id="password-field"
            className="login-field"
            type="password"
            label="Password"
            name="password"
            value={ this.state.password }
            onChange={ this.handleInputChange }
            fullWidth
            required />
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
