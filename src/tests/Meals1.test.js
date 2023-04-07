import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(mealCategories),
    }));
};

describe('Testando Buttons App Receitas', () => {
  beforeEach(mockFetch);
  test.only('o funcionamento dos componentes do Header', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/meals');
    });

    expect(global.fetch).toHaveBeenCalled();

    const allBtn = screen.getByTestId('All-category-filter');
    const beefBtn = screen.getByTestId('Beef-category-filter');
    const breakfastBtn = screen.getByTestId('Breakfast-category-filter');
    // const chickenBtn = screen.getByTestId('Chicken-category-filter');
    // const dessertBtn = screen.getByTestId('Dessert-category-filter');
    // const goatBtn = screen.getByTestId('Goat-category-filter');

    await act(async () => userEvent.click(beefBtn));
    await act(async () => userEvent.click(beefBtn));
    await act(async () => userEvent.click(allBtn));
    await act(async () => userEvent.click(breakfastBtn));
    await act(async () => userEvent.click(allBtn));
    // await act(async () => userEvent.click(chickenBtn));
    // await act(async () => userEvent.click(dessertBtn));
    // await act(async () => userEvent.click(goatBtn));
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    const searchInput = screen.queryByTestId('search-input');
    userEvent.type(searchInput, 'hhhhh');
    const firstLetter = screen.getByTestId('name-search-radio');
    userEvent.click(firstLetter);
    const execBtn = screen.getByTestId('exec-search-btn');
    expect(execBtn).toBeInTheDocument();
    userEvent.click(execBtn);
  });

  test('o funcionamento dos componentes do Header', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/drinks');
    });

    const allBtn = screen.getByTestId('All-category-filter');
    const beefBtn = screen.getByTestId('Beef-category-filter');
    const breakfastBtn = screen.getByTestId('Breakfast-category-filter');
    const chickenBtn = screen.getByTestId('Chicken-category-filter');
    const dessertBtn = screen.getByTestId('Dessert-category-filter');
    const goatBtn = screen.getByTestId('Goat-category-filter');

    userEvent.click(allBtn);
    userEvent.click(beefBtn);
    userEvent.click(breakfastBtn);
    userEvent.click(chickenBtn);
    userEvent.click(dessertBtn);
    userEvent.click(goatBtn);
  });
});
