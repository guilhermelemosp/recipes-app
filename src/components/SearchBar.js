import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <label htmlFor="Ingredient">
        <input
          data-testid="ingredient-search-radio"
          id="Ingredient"
          type="radio"
          name="radio"
          // checked=""
          // onClick={}
          // onChange={}
        />
        Busca por Ingrediente
      </label>

      <label htmlFor="Name">
        <input
          data-testid="name-search-radio"
          id="Name"
          type="radio"
          name="radio"
          // checked=""
          // onClick={}
          // onChange={}
        />
        Busca por Nome
      </label>

      <label htmlFor="FirstLetter">
        <input
          data-testid="first-letter-search-radio"
          id="FirstLetter"
          type="radio"
          name="radio"
          // checked=""
          // onClick={}
          // onChange={}
        />
        Busca por Primeira Letra
      </label>

      <div>
        <button
          data-testid="exec-search-btn"
          type="button"
        // onClick={}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
