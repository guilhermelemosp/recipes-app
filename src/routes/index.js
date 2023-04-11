import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import RecipeMeal from '../pages/RecipeMeal';
import RecipeDrink from '../pages/RecipeDrink';
import MealsRecipesInProgress from '../pages/MealsRecipesInProgress';
import DrinksRecipesInProgress from '../pages/DrinksRecipesInProgress';
import Profile from '../pages/ProfilePage';
import FavoritePage from '../pages/FavoritePage';
import DoneRecipes from '../pages/DoneRecipes';

function Routes() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/meals"
          component={ Meals }
        />
        <Route
          exact
          path="/drinks"
          component={ Drinks }
        />
        <Route
          exact
          path="/meals/:id"
          component={ RecipeMeal }
        />
        <Route
          exact
          path="/drinks/:id"
          component={ RecipeDrink }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          component={ MealsRecipesInProgress }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          component={ DrinksRecipesInProgress }
        />
        <Route
          exact
          path="/profile"
          component={ Profile }
        />
        <Route
          exact
          path="/favorite-recipes"
          component={ FavoritePage }
        />
        <Route
          exact
          path="/done-recipes"
          component={ DoneRecipes }
        />
      </Switch>
    </div>
  );
}

export default Routes;
