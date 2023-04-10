const readFavorite = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
const saveFavorite = (favoriteSongs) => localStorage
  .setItem('favoriteRecipes', JSON.stringify(favoriteSongs));

export const getFavorite = () => {
  if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  const favorite = readFavorite();
  return favorite;
};

export const addFav = (fav) => {
  if (fav) {
    const favoriteSongs = readFavorite();
    saveFavorite([...favoriteSongs, {
      id: fav[0].idMeal || fav[0].idDrink,
      type: !fav[0].strYoutube ? 'drink' : 'meal',
      nationality: fav[0].strArea,
      category: fav[0].strCategory,
      alcoholicOrNot: fav[0].strAlcoholic ? fav[0].strAlcoholic : '',
      name: fav[0].strMeal || fav[0].srtDrink,
      image: fav[0].strMealThumb || fav[0].strDrinkThumb,
    }]);
  }
};

export const removeFavD = (fav) => {
  const favorite = readFavorite();
  saveFavorite(favorite.filter((s) => s.id !== fav[0].idDrink));
};

export const removeFavM = (fav) => {
  const favorite = readFavorite();
  saveFavorite(favorite.filter((s) => s.id !== fav[0].idMeal));
};
