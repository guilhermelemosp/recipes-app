import React, { useContext, useEffect, useState } from 'react';
import '../index.css';
import { useLocation, useParams } from 'react-router-dom';
import SearchBarContext from '../hooks/context/SearchBarContext';
import useObjectReduce from '../hooks/useObjectReduce';
import useFetch from '../services/useFetch';

function RecipeInProgress() {
  const { specificFood, setSpecificFood } = useContext(SearchBarContext);
  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const { pathname } = useLocation();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = today.getMonth() + 1;
  const dd = today.getDate();
  const formattedToday = `${dd}/${mm}/${yyyy}`;
  // const [checkbox, setCheckbox] = useState(false);
  const { fetchFood } = useFetch(setSpecificFood, url);

  useEffect(() => {
    fetchFood();
  }, []);

  useEffect(() => {
    ingredient.filterObjectKeys();
    measure.filterObjectKeys();
  }, [specificFood]);

  const getSavedRecipes = () => {
    const savedRecipes = localStorage.getItem('doneRecipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  };

  const savesRecipes = () => {
    const storageRecipes = getSavedRecipes();
    const saveRecipes = [...storageRecipes, {
      id: specificFood[0].idMeal || specificFood[0].idDrink,
      type: !specificFood[0].strYoutube ? 'drink' : 'meal',
      nationality: specificFood[0].strArea,
      category: specificFood[0].strCategory,
      alcoholicOrNot: specificFood[0].strAlcoholic,
      name: specificFood[0].strMeal || specificFood[0].srtDrink,
      image: specificFood[0].strMealThumb || specificFood[0].strDrinkThumb,
      doneDate: formattedToday,
      tags: specificFood[0].strTags ? specificFood[0].strTags : [],
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(saveRecipes));
  };

  const btnFinish = () => {
    savesRecipes();
  };
  return (
    <>
      { specificFood?.map((food) => (
        <div key={ food.strMeal || food.strDrink }>
          <p data-testid="recipe-title">{ food.strMeal || food.strDrink }</p>
          <h3
            data-testid="recipe-category"
          >
            { pathname.includes('meals') ? food.strCategory : food.strAlcoholic }
          </h3>
          <img
            src={ food.strMealThumb || food.strDrinkThumb }
            alt={ food.strMeal }
            data-testid="recipe-photo"
            style={ { maxWidth: 200 } }
          />
          {measure.results?.map((qntt, index) => (
            <p
              key={ index }
            >
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ `ingredient-${index}` }
              >
                <input
                  type="checkbox"
                  id={ `ingredient-${index}` }
                />
                { `${qntt} ${ingredient.results[index]}` }
              </label>
            </p>
          ))}
          {' '}
          <p data-testid="instructions">{ food.strInstructions }</p>
        </div>
      ))}
      <div>
        <button
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
      <br />
      <br />
      <button
        data-testid="finish-recipe-btn"
        className="btn-start"
        onClick={ () => btnFinish() }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
