import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Carousel from 'react-multi-carousel';
import useFetch from '../services/useFetch';
import useObjectReduce from '../hooks/useObjectReduce';
import { drinksRecommends, mealsRecommends } from '../services/fetchApi';
import 'react-multi-carousel/lib/styles.css';

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;

  const [specificFood, setSpecificFood] = useState([]);
  const [recommendMeals, setRecommendMeals] = useState([]);
  const [recommendDrinks, setRecommendDrinks] = useState([]);
  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const { fetchFood } = useFetch(setSpecificFood, url);
  const six = 6;

  useEffect(() => {
    fetchFood();
  }, []);

  useEffect(() => {
    ingredient.filterObjectKeys();
    measure.filterObjectKeys();
  }, [specificFood]);

  const recommendAPI = async () => {
    if (pathname.includes('meals')) {
      const api = await drinksRecommends();
      setRecommendDrinks(api.drinks);
    }
    if (pathname.includes('drinks')) {
      const api = await mealsRecommends();
      setRecommendMeals(api.meals);
    }
  };

  useEffect(() => {
    recommendAPI();
  }, []);

  const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  console.log(recommendDrinks);
  console.log(recommendMeals);

  return (
    <div>
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
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${qntt} ${ingredient.results[index]}` }
            </p>
          ))}
          {' '}
          <p data-testid="instructions">{ food.strInstructions }</p>
          { !food.strYoutube ? '' : (
            <ReactPlayer url={ food.strYoutube } data-testid="video" />
          )}
        </div>
      ))}
      <Carousel
        responsive={ responsive }
        swipeable
      >
        { pathname.includes('meals')
          ? recommendDrinks.slice(0, six).map((drinks, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ drinks.strDrinkThumb }
                alt={ drinks.srtDrink }
                width={ 200 }
              />
              <div
                data-testid={ `${index}-recommendation-title` }
              >
                {drinks.strDrink}

              </div>
            </div>
          )) : recommendMeals.slice(0, six).map((meal, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recommendation-card` }
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.srtMeal }
                width={ 200 }

              />
              <div
                data-testid={ `${index}-recommendation-title` }
              >
                {meal.strMeal}

              </div>
            </div>
          )) }
      </Carousel>
    </div>
  );
}
