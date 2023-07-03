import { fetchIngredients } from '../../utils/api';

import {
  GET_INGREDIENTS_API,
  GET_INGREDIENTS_API_OK,
  GET_INGREDIENTS_API_FAIL,
} from '../../utils/constants';

import { TIngredient, AppDispatch } from '../../utils/types';

export interface IGetIngredients {
  readonly type: typeof GET_INGREDIENTS_API;
}
export interface IGetIngredientsOK {
  readonly type: typeof GET_INGREDIENTS_API_OK;
  readonly items: TIngredient[];
}
export interface IGetIngredientsFail {
  readonly type: typeof GET_INGREDIENTS_API_FAIL;
}

export type TIngredientActions = IGetIngredients | IGetIngredientsOK | IGetIngredientsFail;


export const getIngredientsOK = (
  items: TIngredient[]
): IGetIngredientsOK => ({
  type: GET_INGREDIENTS_API_OK,
  items,
});

export const getIngredients = () => (dispatch: AppDispatch) => {
    dispatch({
      type: GET_INGREDIENTS_API
    });
    return fetchIngredients().then((res) => {
      if (res && res.success) {
        dispatch({
          type: GET_INGREDIENTS_API_OK,
          items: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_API_FAIL
        });
      }
    });
};