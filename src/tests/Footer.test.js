import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import App from '../App';
import LoginProvider from '../hooks/provider/LoginProvider';

describe('Testando Footer', () => {
  test('Testando 45% do Footer', async () => {
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

    userEvent.type(pwdInput, '1234567');
    userEvent.type(emailInput, 'diovalenca@gmail.com');
    userEvent.click(btnLogin);

    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    expect(mealsIcon).toBeInTheDocument();
    expect(drinksIcon).toBeInTheDocument();

    userEvent.click(mealsIcon);
    const mealsText = screen.getByText('Meals');
    expect(mealsText).toBeInTheDocument();

    userEvent.click(drinksIcon);
    const drinksText = screen.getByText('Drinks');
    expect(drinksText).toBeInTheDocument();
  });
});
