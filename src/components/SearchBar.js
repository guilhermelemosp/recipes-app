import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBarContext from '../hooks/context/SearchBarContext';
import { DrinksAPI, MealsAPI,
} from '../services/fetchApi';

export default function SearchBar() {
  const { inputValue,
    radioInput,
    setRadioInput,
    setRecipe,
    // setIsApiLoading
  } = useContext(SearchBarContext);

  const history = useHistory();
  const btnSearch = async () => {
    if (history.location.pathname === '/meals') {
      const api = await MealsAPI(radioInput, inputValue);
      // console.log(api);
      if (api !== 'Error' && api.meals.length === 1) {
        history.push(`/meals/${api.meals[0].idMeal}`);
        // setIsApiLoading(true);
      }
      setRecipe(api.meals);
    }
    if (history.location.pathname === '/drinks') {
      const api = await DrinksAPI(radioInput, inputValue);
      console.log(api);
      if (api !== 'Error' && api.drinks.length === 1) {
        history.push(`/drinks/${api.drinks[0].idDrink}`);
        // setIsApiLoading(true);
      }
      setRecipe(api.drinks);
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
