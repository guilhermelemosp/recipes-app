import React from 'react';
import Header from '../components/Header';
import FavoriteRecipes from '../components/FavoriteRecipes';

export default function FavoritePages() {
  return (
    <div>
      <Header isRender={ false } namePage="Favorite Recipes" />
      <FavoriteRecipes />
    </div>
  );
}
