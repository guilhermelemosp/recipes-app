import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneDrinkId15997 from '../../cypress/mocks/oneDrinkId15997';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(oneDrinkId15997),
    }));
};

describe('Testando page RecipeInProgress de um Drink do App Receitas', () => {
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
  test('o funcionamento da page RecipeInProgress', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/drinks/15997/in-progress');
    });

    expect(global.fetch).toHaveBeenCalled();

    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipePhoto = screen.getByTestId('recipe-photo');
    const ingredient = screen.getByTestId('0-ingredient-step');
    const instructions = screen.getByTestId('instructions');
    const inputBox = screen.getByTestId('0-ingredient-box');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const shareBtn = screen.getByTestId('share-btn');
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    // const copy = screen.getByTestId('copy');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(inputBox).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(finishBtn).toBeInTheDocument();

    expect(finishBtn).toBeDisabled();
    expect(favoriteBtn).not.toBeDisabled();
    expect(shareBtn).not.toBeDisabled();

    await act(async () => userEvent.click(inputBox));
    await act(async () => userEvent.click(inputBox));
    await act(async () => userEvent.click(inputBox));

    expect(finishBtn).not.toBeDisabled();

    await act(async () => userEvent.click(shareBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));

    // await waitFor(() => expect(copy).toBeInTheDocument());

    await act(async () => userEvent.click(finishBtn));
    window.location.reload();
    expect(window.location.reload).toHaveBeenCalledTimes(1);
    // await act(async () => userEvent.click(breakfastBtn));
    // await act(async () => userEvent.click(allBtn));

    // const searchTopBtn = screen.getByTestId('search-top-btn');
    // userEvent.click(searchTopBtn);
    // const searchInput = screen.queryByTestId('search-input');
    // userEvent.type(searchInput, 'hhhhh');
    // const firstLetter = screen.getByTestId('name-search-radio');
    // userEvent.click(firstLetter);
    // const execBtn = screen.getByTestId('exec-search-btn');
    // expect(execBtn).toBeInTheDocument();
    // userEvent.click(execBtn);
  });
});
