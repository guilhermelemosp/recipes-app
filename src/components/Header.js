import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import SearchBarContext from '../hooks/context/SearchBarContext';

function Header({ namePage, isRender }) {
  const { inputValue, setInputValue } = useContext(SearchBarContext);
  const [showsearchBox, setShowSearchBox] = useState(false);

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
              value={ inputValue }
              onChange={ (e) => setInputValue(e.target.value) }
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
