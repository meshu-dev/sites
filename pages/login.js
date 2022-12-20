import { useState } from 'react';
import Router from 'next/router';
import LoginForm from '../components/LoginForm/LoginForm';

import { useLoginMutation } from '../services/auth';
import { mainAction } from '../store/main-slice';

export default () => {
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [messages, setMessages] = React.useState([]);

  const handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === 'email') {
      setEmail(value);
    }

    if (name === 'password') {
      setPassword(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const params = {
      email,
      password
    };

    const response = await login(params);

    if (response.data && response.data.token) {
      localStorage.setItem('isLoggedIn', true);
      Router.push('/');
    } else {
      console.log('Login failed', response);
    }
  }

  return (
    <LoginForm
      email={ email }
      password={ password }
      handleInputChange={ handleInputChange }
      handleSubmit={ handleSubmit } />
  );
}
