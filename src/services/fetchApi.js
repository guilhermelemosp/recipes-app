export const getIngredient = async (ingredient) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const requestJson = await request.json();
  return requestJson;
};

export const getName = async (name) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
  const requestJson = await request.json();
  return requestJson;
};

export const getFirstL = async (fistL) => {
  const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fistL}`);
  const requestJson = await request.json();
  return requestJson;
};

export const getDrinkIng = async (ingredient) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
  const requestJson = await request.json();
  return requestJson;
};

export const getDrinkName = async (name) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
  const requestJson = await request.json();
  return requestJson;
};

export const getDrinkFirstL = async (fistL) => {
  const request = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${fistL}`);
  const requestJson = await request.json();
  return requestJson;
};
