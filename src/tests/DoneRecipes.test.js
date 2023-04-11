import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(oneMeal),
    }));
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

    const doneRecipes = screen.getByText('Done Recipes');
    expect(doneRecipes).toBeInTheDocument();

    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    await act(async () => userEvent.click(shareBtn));

    const allBtn = screen.getByTestId('filter-by-all-btn');
    expect(allBtn).toBeInTheDocument();
    await act(async () => userEvent.click(allBtn));
    const penne = screen.getByText('Spicy Arrabiata Penne');
    expect(penne).toBeInTheDocument();

    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(filterByDrinkBtn).toBeInTheDocument();
    await act(async () => userEvent.click(filterByDrinkBtn));
    expect(penne).not.toBeInTheDocument();

    const filterByMealBtn = screen.getByTestId('filter-by-meal-btn');
    expect(filterByMealBtn).toBeInTheDocument();
    await act(async () => userEvent.click(filterByMealBtn));
  });
});
