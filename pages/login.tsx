import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Head from 'next/head';
import LoginForm from '@/app/components/LoginForm/LoginForm';
import StatusMsg from '@/app/components/Layout/StatusMsg/StatusMsg';
import { useLoginMutation } from '@/app/services/auth';
import { mainAction } from '@/app/store/main-slice';
import styles from '@/app/styles/login.module.scss';

export default () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      setStatusMsg(response);
      console.log('Login failed', response);
    }
  }

  const setStatusMsg = (response) => {
    if (response['error']) {
      const data = response['error']['data'];

      const params = {
        type: 'error',
        messages: [data['error']]
      };

      dispatch(mainAction.setStatusMsg(params));
    }
  }

  return (
    <div id={ styles['login-background'] }>
      <div id={ styles['login-content'] }>
        <Head>
          <title>DevAdmin - Login</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1>DevAdmin Login</h1>
        <StatusMsg />
        <LoginForm
          email={ email }
          password={ password }
          handleInputChange={ handleInputChange }
          handleSubmit={ handleSubmit } />
      </div>
    </div>
  );
}
