import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
// import headerContext from '../hooks/context/headerContext';

function Header({ namePage, isRender }) {
  const [showsearchBox, setShowSearchBox] = useState(false);
  // const [inputValue, setInputValue] = useState('');

  const history = useHistory();
  function redirectToProfile() {
    history.push('/profile');
  }

  return (
    <header>
      <section>
        <div>
          <input
            type="image"
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
            onClick={ redirectToProfile }
          />
        </div>
        <div>
          <h1
            data-testid="page-title"
          >
            { namePage }
          </h1>
        </div>

        <div>
          {isRender && (

            <input
              type="image"
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
              onClick={ () => setShowSearchBox(!showsearchBox) }
            />
          )}

        </div>
        {showsearchBox && (
          <div>

            <input
              data-testid="search-input"
              type="text"
              placeholder="Comece por aqui! Digite sua receita!"
              // value={ inputValue }
              // onChange={ ({ target }) => setInputValue(target.value) }
            />
            <SearchBar />
          </div>

        )}
      </section>
    </header>
  );
}
Header.propTypes = {
  namePage: PropTypes.string,
}.isRequired;

export default Header;
