import React, { FormEventHandler } from 'react';
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ErrorPanel from '../ErrorPanel/ErrorPanel';
import styles from './LoginForm.module.scss';

type Props = {
  email: string,
  password: string,
  handleInputChange: (event: object) => void,
  handleSubmit: (event: object) => void
}

const LoginForm = ({ email, password, handleInputChange, handleSubmit }: Props) => {
  return (
    <form id={ styles['login'] } onSubmit={ handleSubmit }>
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
  );
}

export default LoginForm;
