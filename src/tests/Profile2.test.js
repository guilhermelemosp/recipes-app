import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch);
};

describe('Testando Profile', () => {
  beforeEach(mockFetch);
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    window.location.reload = reload;
  });
  test('o funcionamento da page DoneRecipes', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/profile');
    });

    // expect(global.fetch).toHaveBeenCalled();

    // const emailInput = screen.getByTestId('email-input');
    // const pwdInput = screen.getByTestId('password-input');
    // const btnLogin = screen.getByTestId('login-submit-btn');
    // const profileBtn = screen.getByTestId('profile-top-btn');

    // userEvent.type(emailInput, 'diovalenca@gmail.com');
    // userEvent.type(pwdInput, '1234567');

    // await act(async () => userEvent.click(btnLogin));
    // await act(async () => userEvent.click(profileBtn));

    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await act(async () => userEvent.click(logoutBtn));
  });
});
