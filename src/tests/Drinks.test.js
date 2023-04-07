import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import drinkCategories from '../../cypress/mocks/drinkCategories';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(drinkCategories),
    }));
};

describe('Testando Buttons App Receitas', () => {
  beforeEach(mockFetch);
  test.only('o funcionamento dos componentes do Header', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    expect(global.fetch).toHaveBeenCalled();

    const allBtn = screen.getByTestId('All-category-filter');
    const cocktailBtn = screen.getByTestId('Cocktail-category-filter');
    // const chickenBtn = screen.getByTestId('Chicken-category-filter');
    // const dessertBtn = screen.getByTestId('Dessert-category-filter');
    // const goatBtn = screen.getByTestId('Goat-category-filter');

    await act(async () => userEvent.click(cocktailBtn));
    await act(async () => userEvent.click(cocktailBtn));
    await act(async () => userEvent.click(allBtn));
    await act(async () => userEvent.click(cocktailBtn));
    await act(async () => userEvent.click(allBtn));
    // await act(async () => userEvent.click(chickenBtn));
    // await act(async () => userEvent.click(dessertBtn));
    // await act(async () => userEvent.click(goatBtn));
  });
});
