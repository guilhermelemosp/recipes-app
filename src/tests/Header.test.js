import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
// import LoginProvider from '../hooks/provider/LoginProvider';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testando Header App Receitas', () => {
  test('o funcionamento dos componentes do Header', () => {
    renderWithRouter(<Header />);

    const pageTitle = screen.getByTestId('page-title');
    const searchInput = screen.queryByTestId('search-input');
    expect(searchInput).toBeNull();
    expect(pageTitle).toBeInTheDocument();
  });

  test('Se ao clicar no ícone de Profile a página é renderizada corretamente', () => {
    const { history } = renderWithRouter(<Header />);

    const profileTopBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileTopBtn);
    expect(history.location.pathname).toBe('/profile');
  });
});
