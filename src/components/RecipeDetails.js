import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Carousel from 'react-multi-carousel';
import clipboardCopy from 'clipboard-copy';
import useFetch from '../services/useFetch';
import useObjectReduce from '../hooks/useObjectReduce';
import { drinksRecommends, mealsRecommends } from '../services/fetchApi';
import 'react-multi-carousel/lib/styles.css';
import '../index.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { addFav, getFavorite, removeFavD, removeFavM } from '../services/favoriteSave';

export default function RecipeDetails() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;
  const [specificFood, setSpecificFood] = useState([]);
  const [recommendMeals, setRecommendMeals] = useState([]);
  const [recommendDrinks, setRecommendDrinks] = useState([]);
  const [copied, setCopied] = useState(false);
  const [arrayFav, setArrayFav] = useState([]);
  const [heart, setHeart] = useState(false);
  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const { fetchFood } = useFetch(setSpecificFood, url);
  const six = 6;

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
    fetchFood();
  }, []);

  useEffect(() => {
    ingredient.filterObjectKeys();
    measure.filterObjectKeys();
  }, [specificFood]);

  useEffect(() => {
    recommendAPI();
    const favArray = getFavorite();
    setArrayFav(favArray);
  }, []);

  const responsive = {
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const btnStart = () => {
    if (pathname.includes('meals')) {
      history.push(`/meals/${specificFood[0].idMeal}/in-progress`);
    }
    if (pathname.includes('drinks')) {
      history.push(`/drinks/${specificFood[0].idDrink}/in-progress`);
    }
  };

  const favOnOff = () => {
    if (pathname.includes('drinks')) {
      if (arrayFav.some((fav) => (fav
        .id === specificFood[0].idDrink))) {
        removeFavD(specificFood);
        setHeart(false);
      } else {
        addFav(specificFood);
        setHeart(true);
      }
    }
    if (pathname.includes('meals')) {
      if (arrayFav.some((fav) => (fav
        .id === specificFood[0].idMeal))) {
        removeFavM(specificFood);
        setHeart(false);
      } else {
        addFav(specificFood);
        setHeart(true);
      }
    }
  };
  console.log(heart);
  useEffect(() => {
    if (pathname.includes('drinks')) {
      if ((JSON.parse(localStorage.getItem('favoriteRecipes'))).some((fav) => (fav
        .id === id))) {
        setHeart(true);
      } else {
        setHeart(false);
      }
    }
    if (pathname.includes('meals')) {
      if ((JSON.parse(localStorage.getItem('favoriteRecipes'))).some((fav) => (fav
        .id === id))) {
        setHeart(true);
      } else {
        setHeart(false);
      }
    }
  }, []);

  const saveFavBtn = () => {
    favOnOff();
    const arrayFav2 = getFavorite();
    setArrayFav(arrayFav2);
    console.log(arrayFav);
  };

  const shareBtn = () => {
    clipboardCopy(window.location.href);
    setCopied(true);
  };

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
          <p data-testid="instructions">{ food.strInstructions }</p>
          { !food.strYoutube ? '' : (
            <ReactPlayer
              width={ 340 }
              height={ 200 }
              url={ food.strYoutube }
              data-testid="video"
            />
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
      <div>
        <button
          data-testid="share-btn"
          onClick={ () => shareBtn() }
        >
          <img src={ shareIcon } alt="shareIcon.svg" />
        </button>
        <button
          onClick={ () => saveFavBtn() }
        >
          { heart
            ? (
              <img
                data-testid="favorite-btn"
                src={ blackHeartIcon }
                alt="blackHeartIcon.svg"
              />
            )
            : (
              <img
                data-testid="favorite-btn"
                src={ whiteHeartIcon }
                alt="whiteHeartIcon.svg"
              />
            )}
        </button>
      </div>
      { copied && <span>Link copied!</span>}
      <br />
      <br />
      <button
        data-testid="start-recipe-btn"
        className="btn-start"
        onClick={ () => btnStart() }
      >
        Start Recipe
      </button>
    </div>
  );
}
