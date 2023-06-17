//Редьюсер для действий с деталями ингредиента в redux (открыть/закрыть)
import {
    OPEN_INGREDIENT_DETAILS,
    CLOSE_INGREDIENT_DETAILS
  } from '../actions/ingredients';

const initialIngredientDetailsState = {
    ingredientDetails: null,
  };

export const ingredientDetailsReducer = (
    state = initialIngredientDetailsState,
    action
  ) => {
    switch (action.type) {
      case OPEN_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: action.payload,
        };
      }
      case CLOSE_INGREDIENT_DETAILS: {
        return {
          ...state,
          ingredientDetails: null,
        };
      }
      default: {
        return state;
      }
    }
  };