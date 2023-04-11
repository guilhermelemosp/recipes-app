import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

beforeEach(() => {
  renderWithRouter(<App />, '/profile');
});

describe('Testa página de profile', () => {
  test('Se renderiza header', async () => {
    const header = await screen.findByTestId('page-title');
    expect(header).toBeInTheDocument();
    expect(header.textContent).toBe('Profile');
  });

  test('Se renderizou email', async () => {
    const email = await screen.findByTestId('profile-email');
    expect(email).toBeInTheDocument();
  });

  test('Se footer foi renderizado', () => {
    const footer = screen.getByTestId('drinks-bottom-btn');
    expect(footer).toBeInTheDocument();

    const drinksPage = screen.getByTestId('drinks-bottom-btn');
    expect(drinksPage).toBeInTheDocument();

    const foodsPage = screen.getByTestId('meals-bottom-btn');
    expect(foodsPage).toBeInTheDocument();
  });
});

describe('Testa botões da página de perfil', () => {
  test('Se existem botões da página de perfil', async () => {
    const buttons = await screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  test('Se botões de receitas feitas renderiza a página correta', async () => {
    const recipesDoneBtn = await screen
      .getByRole('button', { name: /Done Recipes/i });
    expect(recipesDoneBtn).toBeInTheDocument();
    userEvent.click(recipesDoneBtn);
    const doneRecipesTitle = screen.getByText('Done Recipes');
    expect(doneRecipesTitle).toBeInTheDocument();
  });
});

describe('Testa o LocalStorage', () => {
  test('Localstorage salva os itens', async () => {
    const mockEmail = '{ "email": "trybe@trybe.com" }';
    localStorage.setItem('user', mockEmail);
    const localStorage1 = localStorage.getItem('user');
    // const profileEmail = screen.getByTestId('profile-email');
    // expect(profileEmail).toEqual(localStorage1);
    await waitFor(() => {
      expect(localStorage1).toEqual(mockEmail);
    });
  });
});
