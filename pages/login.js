import { useState } from 'react';
import Router from 'next/router';
import LoginForm from '../components/LoginForm/LoginForm';
import { apiLogin } from '../components/auth.js';

export default () => {
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

    const isLoggedIn = await apiLogin(
      email,
      password
    );

    console.log('LOGIN', isLoggedIn);

    if (isLoggedIn === true) {
      Router.push('/');
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
