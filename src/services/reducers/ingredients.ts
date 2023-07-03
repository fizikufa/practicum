
import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_OK,
  GET_INGREDIENTS_API_FAIL,
} from '../../utils/constants';

import { TIngredientActions } from '../actions/ingredients'
import { TIngredient } from '../../utils/types';

type TIngredientsState = {
  items: TIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
};

const initialIngredientsState:TIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false
};


export const ingredientsReducer = (state = initialIngredientsState,action: TIngredientActions):TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_API: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_INGREDIENTS_API_OK: {
      return {
        ...state,
        items: action.items,
        itemsFailed: false,
        itemsRequest: false,
      };
    }
    case GET_INGREDIENTS_API_FAIL: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default: {
      return state;
    }
  }
};