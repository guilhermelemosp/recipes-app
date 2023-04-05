import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBarContext from '../hooks/context/SearchBarContext';

export default function Drinks() {
  const { recipe } = useContext(SearchBarContext);
  const twelve = 12;

  return (
    <>
      <div><Header isRender namePage="Drinks" /></div>
      {recipe ? (

        recipe.slice(0, twelve).map((drink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
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
          </div>

        ))
      )
        : <h1>XABLAUUUUUUU</h1>}
      <div><Footer /></div>
    </>
  );
}
