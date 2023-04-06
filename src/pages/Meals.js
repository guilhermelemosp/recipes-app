import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBarContext from '../hooks/context/SearchBarContext';
import { defaultSearch, filterByCategory, getCategories } from '../services/fetchApi';

export default function Meals() {
  const {
    recipe,
    setRecipe,
    setCategories,
    categories,
    lastFilter,
    setLastFilter } = useContext(SearchBarContext);

  const twelve = 12;
  const five = 5;

  const getMeals = async () => {
    const api = await defaultSearch('meals');
    setRecipe(api.meals);
    const foundCategories = await getCategories('meals');
    setCategories(foundCategories.meals);
  };
  const allButtonClick = () => {
    getMeals();
    setLastFilter('');
  };

  useEffect(() => {
    getMeals();
  }, []);

  const filteredCategory = async (category) => {
    if (lastFilter === category) {
      getMeals();
      setLastFilter('');
    } else {
      const recipes = await filterByCategory(category, 'meals');
      setRecipe(recipes.meals);
      setLastFilter(category);
    }
  };

  return (
    <>
      <div><Header isRender namePage="Meals" /></div>

      <div>
        <button data-testid="All-category-filter" onClick={ allButtonClick }>All</button>
        { categories?.slice(0, five).map((category, index) => (
          <button
            onClick={ () => filteredCategory(category.strCategory) }
            key={ index }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
      </div>

      {recipe ? (

        recipe.slice(0, twelve).map((meal, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/meals/${meal.idMeal}` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                width={ 300 }
              />

              <div
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}
              </div>
            </Link>

          </div>

        ))
      )
        : <h1>XABLAUUUUUUU</h1>}
      <Footer />
    </>
  );
}
