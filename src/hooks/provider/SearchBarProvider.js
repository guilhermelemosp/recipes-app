import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import SearchBarContext from '../context/SearchBarContext';

function SearchBarProvider({ children }) {
  const [inputValue, setInputValue] = useState('');
  const [radioInput, setRadioInput] = useState({
    Ingredient: '',
    FirstLetter: '',
    Name: '',
  });
  const [recipe, setRecipe] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lastFilter, setLastFilter] = useState('');
  const [isApiLoading, setIsApiLoading] = useState(false);

  const value = useMemo(() => ({
    radioInput,
    setRadioInput,
    inputValue,
    setInputValue,
    recipe,
    setRecipe,
    isApiLoading,
    setIsApiLoading,
    categories,
    setCategories,
    lastFilter,
    setLastFilter,

  }), [radioInput, inputValue, isApiLoading, recipe, categories, lastFilter]);

  return (
    <SearchBarContext.Provider value={ value }>
      {children}
    </SearchBarContext.Provider>
  );
}

SearchBarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SearchBarProvider;
