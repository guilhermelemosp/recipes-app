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

describe('Testando RecipeDetails', () => {
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

  test('o funcionamento da page RecipeDetails', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/drinks/15997');
    });

    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipePhoto = screen.getByTestId('recipe-photo');
    const instructions = screen.getByTestId('instructions');
    const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const shareBtn = screen.getByTestId('share-btn');
    const startBtn = screen.getByTestId('start-recipe-btn');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();

    expect(startBtn).not.toBeDisabled();
    expect(favoriteBtn).not.toBeDisabled();
    expect(shareBtn).not.toBeDisabled();

    await act(async () => userEvent.click(shareBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(startBtn));
  });

  test('o funcionamento da page RecipeDetails', async () => {
    await act(async () => {
      renderWithRouter(<App />, '/drinks/15997');
    });

    const recipeTitle = screen.getByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipePhoto = screen.getByTestId('recipe-photo');
    const instructions = screen.getByTestId('instructions');
    const ingredient = screen.getByTestId('0-ingredient-name-and-measure');
    const favoriteBtn = screen.getByTestId('favorite-btn');
    const shareBtn = screen.getByTestId('share-btn');
    const startBtn = screen.getByTestId('start-recipe-btn');

    expect(recipeTitle).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipePhoto).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
    expect(ingredient).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(shareBtn).toBeInTheDocument();
    expect(startBtn).toBeInTheDocument();

    expect(startBtn).not.toBeDisabled();
    expect(favoriteBtn).not.toBeDisabled();
    expect(shareBtn).not.toBeDisabled();

    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(favoriteBtn));
    await act(async () => userEvent.click(startBtn));
  });
});
