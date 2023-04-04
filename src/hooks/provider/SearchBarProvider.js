import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import SearchBarContext from '../context/SearchBarContext';

function SearchBarProvider({ children }) {
  const [inputValue, setInputValue] = useState('');
  const [radioInput, setRadioInput] = useState('');

  const value = useMemo(() => ({
    radioInput,
    setRadioInput,
    inputValue,
    setInputValue,

  }), [radioInput, inputValue]);

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
