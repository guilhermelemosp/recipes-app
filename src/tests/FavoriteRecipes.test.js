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

describe('Testando DoneRecipes', () => {
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
      renderWithRouter(<App />, '/meals/52771/in-progress');
    });

    expect(global.fetch).toHaveBeenCalled();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    await act(async () => userEvent.click(favoriteBtn));
    const inputBox0 = screen.getByTestId('0-ingredient-box');
    const inputBox1 = screen.getByTestId('1-ingredient-box');
    const inputBox2 = screen.getByTestId('2-ingredient-box');
    const inputBox3 = screen.getByTestId('3-ingredient-box');
    const inputBox4 = screen.getByTestId('4-ingredient-box');
    const inputBox5 = screen.getByTestId('5-ingredient-box');
    const inputBox6 = screen.getByTestId('6-ingredient-box');
    const inputBox7 = screen.getByTestId('7-ingredient-box');
    const finishBtn = screen.getByTestId('finish-recipe-btn');

    await act(async () => userEvent.click(inputBox0));
    await act(async () => userEvent.click(inputBox1));
    await act(async () => userEvent.click(inputBox2));
    await act(async () => userEvent.click(inputBox3));
    await act(async () => userEvent.click(inputBox4));
    await act(async () => userEvent.click(inputBox5));
    await act(async () => userEvent.click(inputBox6));
    await act(async () => userEvent.click(inputBox7));
    await act(async () => userEvent.click(finishBtn));

    const profileBtn = screen.getByTestId('profile-top-btn');
    await act(async () => userEvent.click(profileBtn));

    const profileFavBtn = screen.getByTestId('profile-favorite-btn');
    await act(async () => userEvent.click(profileFavBtn));

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    await act(async () => userEvent.click(shareBtn));

    const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favBtn).toBeInTheDocument();
    await act(async () => userEvent.click(favBtn));

    const allBtn = screen.getByTestId('filter-by-all-btn');
    await act(async () => userEvent.click(allBtn));

    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    await act(async () => userEvent.click(filterByDrinkBtn));

    const filterByMealBtn = screen.getByTestId('filter-by-meal-btn');
    await act(async () => userEvent.click(filterByMealBtn));
  });

  test('o funcionamento da page RecipeInProgress', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/drinks/15997/in-progress');
    });

    const inputBox = screen.getByTestId('0-ingredient-box');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const finishBtn = screen.getByTestId('finish-recipe-btn');

    await act(async () => userEvent.click(inputBox));
    await act(async () => userEvent.click(inputBox));
    await act(async () => userEvent.click(inputBox));

    expect(finishBtn).not.toBeDisabled();

    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(finishBtn));

    const profileBtn = screen.getByTestId('profile-top-btn');
    await act(async () => userEvent.click(profileBtn));

    const profileFavBtn = screen.getByTestId('profile-favorite-btn');
    await act(async () => userEvent.click(profileFavBtn));
  });
});
