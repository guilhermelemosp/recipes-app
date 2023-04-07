import React, { useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';
import { mealsRecommends } from '../services/fetchApi';

export default function DrinkDetails() {
  useEffect(() => {
    mealsRecommends();
  });

  return (
    <RecipeDetails />
  );
}
