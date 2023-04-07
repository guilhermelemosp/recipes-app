import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchBarContext from '../hooks/context/SearchBarContext';

function Recipe({ filteredCategory, allButtonClick }) {
  const { categories } = useContext(SearchBarContext);
  const five = 5;

  return (
    <div>
      <button data-testid="All-category-filter" onClick={ allButtonClick }>All</button>

      { categories?.slice(0, five).map((category, index) => (
        <button
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ () => filteredCategory(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

Recipe.propTypes = {
  filteredCategory: PropTypes.func,
  allButtonClick: PropTypes.func,
}.isRequired;

export default Recipe;
