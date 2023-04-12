const getSavedRecipes = () => {
  const savedRecipes = localStorage.getItem('doneRecipes');
  return savedRecipes ? JSON.parse(savedRecipes) : [];
};

const today = new Date();

export const savesRecipes = (specificFood) => {
  const re = /\s*,\s*/;
  const storageRecipes = getSavedRecipes();
  const saveRecipes = [...storageRecipes, {
    id: specificFood[0].idMeal || specificFood[0].idDrink,
    nationality: specificFood[0].strArea ? specificFood[0].strArea : '',
    name: specificFood[0].strMeal || specificFood[0].strDrink,
    category: specificFood[0].strCategory,
    image: specificFood[0].strMealThumb || specificFood[0].strDrinkThumb,
    tags: specificFood[0].strTags ? (specificFood[0].strTags).split(re) : [],
    alcoholicOrNot: specificFood[0].strAlcoholic ? specificFood[0].strAlcoholic : '',
    type: !specificFood[0].strYoutube ? 'drink' : 'meal',
    doneDate: today.toISOString(),
  }];
  localStorage.setItem('doneRecipes', JSON.stringify(saveRecipes));
};
