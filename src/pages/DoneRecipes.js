import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const getSavedRecipes = () => {
    const savedRecipes = localStorage.getItem('doneRecipes');
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  };

  const [copied, setCopied] = useState(false);
  const [idCopied, setIdCopied] = useState(0);

  const shareBtn = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setCopied(true);
    setIdCopied(id);
  };
  const renderTags = (i, tagName) => (
    <div data-testid={ `${i}-${tagName}-horizontal-tag` }>
      { tagName }
    </div>);

  const [recipes, setRecipes] = useState(getSavedRecipes());

  const filterRecipes = (type) => {
    const savedRecipes = getSavedRecipes();
    const filtered = savedRecipes.filter((recipe) => recipe.type === type);
    setRecipes(filtered);
  };

  return (
    <div>
      <Header isRender={ false } namePage="Done Recipes" />
      <div>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setRecipes(getSavedRecipes()) }
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
        { recipes.map((recipe, i) => (
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
            { recipe.tags[0] && renderTags(i, recipe.tags[0])}
            { recipe.tags[1] && renderTags(i, recipe.tags[1])}
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
