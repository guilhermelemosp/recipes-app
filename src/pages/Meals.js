import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBarContext from '../hooks/context/SearchBarContext';

export default function Meals() {
  const { recipe } = useContext(SearchBarContext);
  const twelve = 12;

  return (
    <>
      <div><Header isRender namePage="Meals" /></div>

      {recipe ? (

        recipe.slice(0, twelve).map((meal, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
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
          </div>

        ))
      )
        : <h1>XABLAUUUUUUU</h1>}
      <Footer />
    </>
  );
}
