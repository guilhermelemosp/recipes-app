const readContinue = () => JSON.parse(localStorage.getItem('continueRecipes'));
const saveContinue = (continueRecipe) => localStorage
  .setItem('continueRecipes', JSON.stringify(continueRecipe));

export const addContinue = (fav) => {
  const favoriteSongs = readContinue();
  saveContinue([...favoriteSongs, {
    idPage: fav,
  }]);
};

export const getContinue = () => {
  if (!JSON.parse(localStorage.getItem('continueRecipes'))) {
    localStorage.setItem('continueRecipes', JSON.stringify([]));
  }
  const test = readContinue();
  return test;
};

export const getSavedRecipes = () => {
  if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
};
