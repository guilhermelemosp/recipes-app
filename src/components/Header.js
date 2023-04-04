import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import headerContext from '../hooks/context/headerContext';

function Header({ namePage, isRender }) {
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

            <img
              src={ searchIcon }
              alt="search icon"
              data-testid="search-top-btn"
            />
          )}

        </div>
      </section>
    </header>
  );
}
Header.propTypes = {
  namePage: PropTypes.string,
}.isRequired;

export default Header;
