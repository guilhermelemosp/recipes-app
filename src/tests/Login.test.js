import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import LoginProvider from '../hooks/provider/LoginProvider';

describe('Testando Login App Receitas', () => {
  test('Testando 45% do login', async () => {
    const history = createMemoryHistory();
    render(
      <BrowserRouter>
        <LoginProvider>
          <App history={ history } />
        </LoginProvider>
      </BrowserRouter>,
    );

    const emailInput = screen.getByTestId('email-input');
    const pwdInput = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(pwdInput).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
    expect(btnLogin).toBeDisabled();

    userEvent.type(emailInput, 'diovalenca@gmail.com');
    expect(btnLogin).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(pwdInput, '1234567');
    expect(btnLogin).toBeDisabled();

    userEvent.type(emailInput, 'diovalenca@gmail.com');
    expect(btnLogin).not.toBeDisabled();

    userEvent.click(btnLogin);
    // const { pathname } = history.location;
    // await waitFor(() => expect(pathname).toBe('/meals'));
  });
});
