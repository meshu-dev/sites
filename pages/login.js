import React from 'react';
import Head from 'next/head'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorPanel from '../components/ErrorPanel/ErrorPanel';
import ApiHandler from '../common/ApiHandler';

export default class LoginPage extends React.Component {
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

    const response = await this.loginRequest();

    if (response['token']) {

    } else {
      
    }

    console.log('BIGN!!!', response);
  }

  loginRequest = async () => {
    const params = {
      email: this.state.email,
      password: this.state.password
    };

    const apiHandler = new ApiHandler();
    const response = await apiHandler.post('auth/login', params);

    return response;
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
