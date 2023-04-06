import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import LoginProvider from '../hooks/provider/LoginProvider';
import renderWithRouter from './helpers/renderWithRouter';

describe('Testando SearchBar App Receitas', () => {
  const searchInput1 = 'search-input';
  test('o funcionamento dos componentes do Header', async () => {
    const { history } = renderWithRouter(<App />, '/meals');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    const searchInput = screen.queryByTestId(searchInput1);
    userEvent.type(searchInput, 'a');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetter);
    const execBtn = screen.getByTestId('exec-search-btn');
    expect(execBtn).toBeInTheDocument();
    userEvent.click(execBtn);
    userEvent.clear(searchInput);

    userEvent.type(searchInput, 'lime');
    const ingredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredient);
    userEvent.click(execBtn);
    userEvent.clear(searchInput);

    userEvent.type(searchInput, 'Corba');
    const name = screen.getByTestId('name-search-radio');
    userEvent.click(name);
    userEvent.click(execBtn);
    await waitFor(() => expect(history.location.pathname).toBe('/meals/52977'));

    // const cardImg = screen.getByTestId('0-card-img');
    // await waitFor(() => expect(cardImg).toBeInTheDocument());
    // userEvent.click(cardImg);
  });

  test('o funcionamento dos componentes do Header', async () => {
    const { history } = renderWithRouter(<App />, '/drinks');

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    const searchInput = screen.queryByTestId(searchInput1);
    userEvent.type(searchInput, 'a');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetter);
    const execBtn = screen.getByTestId('exec-search-btn');
    expect(execBtn).toBeInTheDocument();
    userEvent.click(execBtn);
    userEvent.clear(searchInput);

    userEvent.type(searchInput, 'lime');
    const ingredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(ingredient);
    userEvent.click(execBtn);
    userEvent.clear(searchInput);

    userEvent.type(searchInput, 'A1');
    const name = screen.getByTestId('name-search-radio');
    userEvent.click(name);
    userEvent.click(execBtn);
    await waitFor(() => console.log(history.location.pathname));
    await waitFor(() => expect(history.location.pathname).toBe('/drinks/17222'));

    // const cardImg = screen.getByTestId('0-card-img');
    // await waitFor(() => expect(cardImg).toBeInTheDocument());
    // userEvent.click(cardImg);
  });
});
