const termNotFound = 'Term Not Found';
const noRecipeFound = 'Sorry, we haven\'t found any recipes for these filters.';

export const MealsAPI = async (radioInput, termName) => {
  if (radioInput === 'Ingredient') {
    if (!termName) {
      global.alert(termNotFound);
      return 'Error';
    }
    const getIngredient = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${termName}`);
    const requestJson = await getIngredient.json();
    if (requestJson.meals === null) {
      global.alert(noRecipeFound);
      return 'Error';
    }
    return requestJson;
  }

  if (radioInput === 'Name') {
    if (!termName) {
      global.alert(termNotFound);
      return 'Error';
    }
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${termName}`);
    const requestJson = await request.json();
    if (requestJson.meals === null) {
      global.alert(noRecipeFound);
      return 'Error';
    }
    return requestJson;
  }

  if (radioInput === 'FirstLetter') {
    if (!termName) {
      global.alert(termNotFound);
      return 'Error';
    }
    if (termName.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return 'Error';
    }
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${termName}`);
    const requestJson = await request.json();
    return requestJson;
  }
};

export const DrinksAPI = async (radioInput, termName) => {
  if (radioInput === 'Ingredient') {
    if (!termName) {
      global.alert(termNotFound);
      return 'Error';
    }
    const getDrinkIng = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${termName}`);
    const requestJson = await getDrinkIng.json();
    if (requestJson.drinks === null) {
      global.alert(noRecipeFound);
      return 'Error';
    }
    return requestJson;
  }

  if (radioInput === 'Name') {
    if (!termName) {
      global.alert(termNotFound);
      return 'Error';
    }
    const getDrinkName = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${termName}`);
    const requestJson = await getDrinkName.json();
    if (requestJson.drinks === null) {
      global.alert(noRecipeFound);
      return 'Error';
    }
    return requestJson;
  }

  if (radioInput === 'FirstLetter') {
    if (!termName) {
      global.alert(termNotFound);
      return 'Error';
    }
    if (termName.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return 'Error';
    }
    const getDrinkFirstL = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${termName}`);
    const requestJson = await getDrinkFirstL.json();
    return requestJson;
  }
};
