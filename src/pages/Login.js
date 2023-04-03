import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import LoginContext from '../hooks/context/LoginContext';

function Login() {
  const {
    emailUser,
    setEmailUser,
    password,
    setPassword,
  } = useContext(LoginContext);
  const history = useHistory();

  const activeButton = () => {
    const regexEmail = /\S+@\S+\.\S+/i;
    const MIN_LENGTH_PASSWORD = 7;

    const test = regexEmail.test(emailUser) && password.length >= MIN_LENGTH_PASSWORD;

    return test;
  };

  const clickButton = () => {
    localStorage.setItem('user', JSON.stringify({ email: emailUser }));
    history.push('/meals');
  };

  return (
    <div>
      <div>Login</div>
      <form>
        <label
          htmlFor="input-email"
        >
          <input
            data-testid="email-input"
            id="input-email"
            type="email"
            name="email"
            value={ emailUser }
            onChange={ (e) => setEmailUser(e.target.value) }
            placeholder="Email"
            size="lg"
          />
        </label>
        <label htmlFor="input-password">
          <input
            data-testid="password-input"
            id="input-password"
            type="password"
            name="password"
            value={ password }
            onChange={ (e) => setPassword(e.target.value) }
            placeholder="Password"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          onClick={ () => clickButton() }
          disabled={ !activeButton() }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
