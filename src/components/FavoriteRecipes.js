import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { getFavorite, removeFav } from '../services/favoriteSave';

function FavoriteRecipes() {
  const [copied, setCopied] = useState(false);
  const [idCopied, setIdCopied] = useState(0);

  const shareBtn = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
    setIdCopied(id);
  };

  const [recipes, setRecipes] = useState(getFavorite());

  const filterRecipes = (type) => {
    const savedRecipes = getFavorite();
    const filtered = savedRecipes.filter((recipe) => recipe.type === type);
    setRecipes(filtered);
  };

  const saveFavBtn = (id) => {
    removeFav(id);
    setRecipes(getFavorite());
  };

  return (
    <div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipes(getFavorite()) }
        >
          All
        </button>
      </div>
      <div>
        <button data-testid="filter-by-meal-btn" onClick={ () => filterRecipes('meal') }>
          Meals
        </button>
      </div>
      <div>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('drink') }
        >
          Drinks
        </button>
      </div>
      <div>
        { recipes?.map((recipe, i) => (
          <div key={ i }>
            <div>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <img
                  data-testid={ `${i}-horizontal-image` }
                  alt={ recipe.name }
                  src={ recipe.image }
                  width="300"
                  height="300"
                />
              </Link>
            </div>
            <div>
              <Link
                data-testid={ `${i}-horizontal-name` }
                to={ `/${recipe.type}s/${recipe.id}` }
              >
                { recipe.name }
              </Link>
            </div>
            <div data-testid={ `${i}-horizontal-top-text` }>
              { recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}` : recipe.alcoholicOrNot}
            </div>
            <div data-testid={ `${i}-horizontal-done-date` }>
              { recipe.doneDate }
            </div>
            <div>
              <button
                onClick={ () => shareBtn(recipe.id, recipe.type) }
              >
                <img
                  data-testid={ `${i}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareIcon.svg"
                />
              </button>
              <button
                onClick={ () => saveFavBtn(recipe.id) }
              >
                <img
                  data-testid={ `${i}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="blackHeartIcon.svg"
                />
              </button>
              <div>
                { copied && idCopied === recipe.id && <span>Link copied!</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
