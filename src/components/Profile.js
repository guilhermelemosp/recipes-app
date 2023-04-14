import React from 'react';
import { useHistory } from 'react-router-dom';
import { localEmail } from '../services/recipeLocalStorage';

export default function ProfileComponent() {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <div>
        <h3
          data-testid="profile-email"
        >
          {localEmail()}

        </h3>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logOut }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
