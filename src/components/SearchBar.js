import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBarContext from '../hooks/context/SearchBarContext';
import {
  getDrinkFirstL,
  getDrinkIng,
  getDrinkName,
  getFirstL,
  getIngredient,
  getName,
} from '../services/fetchApi';

export default function SearchBar() {
  const { inputValue, radioInput, setRadioInput } = useContext(SearchBarContext);

  const mealsFetch = () => {
    if (radioInput === 'Ingredient') {
      getIngredient(inputValue);
    }
    if (radioInput === 'Name') {
      getName(inputValue);
    }
    if (radioInput === 'FirstLetter' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getFirstL(inputValue);
    }
  };

  const drinksFetch = () => {
    if (radioInput === 'Ingredient') {
      getDrinkIng(inputValue);
    }
    if (radioInput === 'Name') {
      getDrinkName(inputValue);
    }
    if (radioInput === 'FirstLetter' && inputValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      getDrinkFirstL(inputValue);
    }
  };
  const history = useHistory();
  const btnSearch = () => {
    if (history.location.pathname === '/meals') {
      mealsFetch();
    }
    if (history.location.pathname === '/drinks') {
      drinksFetch();
    }
  };

  return (
    <div>
      <label htmlFor="Ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="Ingredient"
          type="radio"
          name="radio"
          value="Ingredient"
          onChange={ (e) => setRadioInput(e.target.value) }
        />
        Ingrediente
      </label>

      <label htmlFor="Name">
        <input
          data-testid="name-search-radio"
          id="Name"
          type="radio"
          name="radio"
          value="Name"
          onChange={ (e) => setRadioInput(e.target.value) }
        />
        Nome
      </label>

      <label htmlFor="FirstLetter">
        <input
          data-testid="first-letter-search-radio"
          id="FirstLetter"
          type="radio"
          name="radio"
          value="FirstLetter"
          onChange={ (e) => setRadioInput(e.target.value) }
        />
        Primeira Letra
      </label>

      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => btnSearch() }
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
