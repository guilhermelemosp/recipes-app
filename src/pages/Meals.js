import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBarContext from '../hooks/context/SearchBarContext';
import { defaultSearch, filterByCategory, getCategories } from '../services/fetchApi';
import Recipes from '../components/Recipes';

export default function Meals() {
  const {
    recipe,
    setRecipe,
    setCategories,
    lastFilter,
    setLastFilter } = useContext(SearchBarContext);

  const twelve = 12;

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
      <Recipes filteredCategory={ filteredCategory } allButtonClick={ allButtonClick } />

      {recipe && (

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
      )}
      <Footer />
    </>
  );
}
