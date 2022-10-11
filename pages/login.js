import React from "react"
import Head from 'next/head'
import { Box } from '@mui/system';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class LoginPage extends React.Component {
  handleSubmit = event => {
    event.preventDefault()

    this.setState({
      isLoading: true,
    })
    this.recaptcha.execute()
  }

  render() {
    return (
      <main id="login">
        <Head>
          <title>DevAdmin - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth="sm">
          <TextField
              id="email-field"
              className="login-field"
              label="Email"
              type="email"
              fullWidth />
          <TextField
            id="password-field"
            className="login-field"
            label="Password"
            type="password"
            fullWidth />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={this.handleSubmit}>Submit</Button>
          </Box>
        </Container>
      </main>
    )
  }
}
