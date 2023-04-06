import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBarContext from '../hooks/context/SearchBarContext';
import { defaultSearch, filterByCategory, getCategories } from '../services/fetchApi';

export default function Drinks() {
  const {
    recipe,
    setRecipe,
    setCategories,
    categories,
    lastFilter,
    setLastFilter } = useContext(SearchBarContext);

  const twelve = 12;
  const five = 5;

  const getDrinks = async () => {
    const api = await defaultSearch();
    setRecipe(api.drinks);
    const foundCategories = await getCategories();
    setCategories(foundCategories.drinks);
  };

  const allButtonClick = () => {
    getDrinks();
    setLastFilter('');
  };

  useEffect(() => {
    getDrinks();
  }, []);

  const filteredCategory = async (category) => {
    if (lastFilter === category) {
      getDrinks();
      setLastFilter('');
    } else {
      const recipes = await filterByCategory(category, '');
      setRecipe(recipes.drinks);
      setLastFilter(category);
    }
  };
  return (
    <>
      <div><Header isRender namePage="Drinks" /></div>

      <div>
        <button data-testid="All-category-filter" onClick={ allButtonClick }>All</button>

        { categories?.slice(0, five).map((category, index) => (
          <button
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => filteredCategory(category.strCategory) }
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      {recipe ? (
        recipe.slice(0, twelve).map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/drinks/${drink.idDrink}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                width={ 300 }
              />

              <div
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}
              </div>
            </Link>
          </div>

        ))
      )
        : <h1>XABLAUUUUUUU</h1>}
      <div><Footer /></div>
    </>
  );
}
