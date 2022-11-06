import React from 'react';
import Head from 'next/head'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorPanel from '../ErrorPanel/ErrorPanel';
import styles from './LoginForm.module.scss';

const LoginForm = ({ email, password, handleInputChange, handleSubmit }) => {
  return (
    <main id={ styles['login'] }>
      <Head>
        <title>DevAdmin - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={ handleSubmit }>
        <h1>DevAdmin Login</h1>
        <ErrorPanel />
        <TextField
          id="email-field"
          className={ styles['login-field'] }
          type="email"
          label="Email"
          name="email"
          value={ email }
          onChange={ handleInputChange }
          fullWidth
          required />
        <TextField
          id="password-field"
          className={ styles['login-field'] }
          type="password"
          label="Password"
          name="password"
          value={ password }
          onChange={ handleInputChange }
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
  );
}

export default LoginForm;
