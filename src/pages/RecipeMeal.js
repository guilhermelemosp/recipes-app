import React, { useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { drinksRecommends } from '../services/fetchApi';

export default function MealDetails() {
  useEffect(() => {
    drinksRecommends();
  });

  return (
    <RecipeDetails />
  );
}
