import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import useObjectReduce from '../hooks/useObjectReduce';
import useFetch from '../services/useFetch';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { addFav, getFavorite, removeFavD, removeFavM } from '../services/favoriteSave';
import './label.css';

function RecipeInProgress() {
  const [specificFood, setSpecificFood] = useState([]);
  const ingredient = useObjectReduce(specificFood, 'Ingredient');
  const measure = useObjectReduce(specificFood, 'strMeasure');
  const history = useHistory();
  const { pathname } = useLocation();
  const { id } = useParams();
  const meals = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const drink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const url = (pathname.includes('meals')) ? meals : drink;
  const today = new Date();
  const [copied, setCopied] = useState(false);
  const [arrayFav, setArrayFav] = useState([]);
  const [heart, setHeart] = useState(false);
  const [disable, setDisable] = useState(true);
  const { fetchFood } = useFetch(setSpecificFood, url);
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    fetchFood();
  }, []);

  useEffect(() => {
    ingredient.filterObjectKeys();
    measure.filterObjectKeys();
  }, [specificFood]);

  useEffect(() => {
    const favArray = getFavorite();
    setArrayFav(favArray);
  }, []);

  const checkboxBtn = () => {
    const boxes = document.querySelectorAll('.box');
    if ([...boxes].every((checkbox) => checkbox.checked)) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const saveCheckbox = (param) => {
    if (checkboxes.includes(param)) {
      const filter = checkboxes.filter((checkbox) => checkbox !== param);
      setCheckboxes(filter);
    } else {
      setCheckboxes([...checkboxes, param]);
    }
  };

  const verifyCheck = (param) => checkboxes.some((checkbox) => checkbox === param);

  const getSavedRecipes = () => {
    const savedRecipes = localStorage.getItem('doneRecipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  };

  const savesRecipes = () => {
    const re = /\s*,\s*/;
    const storageRecipes = getSavedRecipes();
    const saveRecipes = [...storageRecipes, {
      id: specificFood[0].idMeal || specificFood[0].idDrink,
      nationality: specificFood[0].strArea ? specificFood[0].strArea : '',
      name: specificFood[0].strMeal || specificFood[0].strDrink,
      category: specificFood[0].strCategory,
      image: specificFood[0].strMealThumb || specificFood[0].strDrinkThumb,
      tags: specificFood[0].strTags ? (specificFood[0].strTags).split(re) : [],
      alcoholicOrNot: specificFood[0].strAlcoholic ? specificFood[0].strAlcoholic : '',
      type: !specificFood[0].strYoutube ? 'drink' : 'meal',
      doneDate: today.toISOString(),
    }];
    localStorage.setItem('doneRecipes', JSON.stringify(saveRecipes));
    console.log(localStorage.getItem('doneRecipes'));
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

  useEffect(() => {
    if (pathname.includes('drinks')) {
      if ((JSON.parse(localStorage.getItem('favoriteRecipes'))).some((fav) => (fav
        .id === id))) {
        setHeart(true);
        console.log(heart);
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
    clipboardCopy((window.location.href).replaceAll('/in-progress', ''));
    setCopied(true);
  };

  const btnFinish = () => {
    savesRecipes();
    history.push('/done-recipes');
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
                className={ verifyCheck(`${index}-${qntt}`) ? 'label-through' : '' }
              >
                <input
                  data-testid={ `${index}-ingredient-box` }
                  className="box"
                  type="checkbox"
                  id={ `ingredient-${index}` }
                  onChange={ () => { checkboxBtn(); saveCheckbox(`${index}-${qntt}`); } }
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
          onClick={ () => shareBtn() }
        >
          <img
            src={ shareIcon }
            alt="shareIcon.svg"
          />
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
      { copied && <span data-testid="copy">Link copied!</span>}
      <br />
      <br />
      <button
        data-testid="finish-recipe-btn"
        className="btn-start"
        onClick={ () => btnFinish() }
        disabled={ disable }
      >
        Finish Recipe
      </button>
    </>
  );
}

export default RecipeInProgress;
