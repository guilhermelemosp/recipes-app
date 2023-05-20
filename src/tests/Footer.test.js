import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando Footer', () => {
  test('Testando 45% do Footer', async () => {
    renderWithRouter(<App />);

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
