//Редьюсер для действий с ингредиентами в redux
import {
    GET_INGREDIENTS_API,
    GET_INGREDIENTS_API_OK,
    GET_INGREDIENTS_API_FAIL
  } from '../actions/ingredients';
  
  //  Начальное состояние стора ингредиентов
  const initialIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,
  };
  
 
  export const ingredientsReducer = (state = initialIngredientsState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_API: {
        return {
          ...state,
          ingredientsRequest: true,
        };
      }
      case GET_INGREDIENTS_API_OK: {
        return {
          ...state,
          ingredients: action.ingredients,
          ingredientsFailed: false,
          ingredientsRequest: false,
        };
      }
      case GET_INGREDIENTS_API_FAIL: {
        return { ...state,ingredients: [], ingredientsFailed: true, ingredientsRequest: false };
      }
      default: {
        return state;
      }
    }
  };
  


  

  