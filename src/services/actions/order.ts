import { postOrder } from '../../utils/api';
import { TIngredient, AppDispatch } from '../../utils/types';

import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN,
  POST_ORDER_API,
  POST_ORDER_API_OK,
  POST_ORDER_API_FAIL,
  DELETE_ORDER
} from '../../utils/constants';


export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  payload: TIngredient;
}

export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly payload: {
    whichIngredientDroppedUid: string;
    onWhichIngredientDroppedUid: string;
  }
}

export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  payload: string;
}

export interface IAddBun {
  readonly type: typeof ADD_BUN;
  payload: TIngredient;
}
export interface IPostOrder {
  readonly type: typeof POST_ORDER_API;
}

export interface IPostOrderOK {
  readonly type: typeof POST_ORDER_API_OK;
  payload: number;
}

export interface IPostOrderFail {
  readonly type: typeof POST_ORDER_API_FAIL;
}

export interface IDeleteOrder {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderActions = IAddIngredient
| IMoveIngredient
| IRemoveIngredient
| IAddBun
| IPostOrder
| IPostOrderOK
| IPostOrderFail
| IDeleteOrder;

export const dispatchOrderOK = (
  payload: number
): IPostOrderOK => ({
  type: POST_ORDER_API_OK,
  payload,
});

export const dispatchOrder = (orderDataID: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: POST_ORDER_API
    });
    postOrder(orderDataID).then((res) => {
      if (res && res.success) {
        dispatch(dispatchOrderOK(res.order.number));
      } else {
        dispatch({
          type: POST_ORDER_API_FAIL,
        });
      }
    });
  };
};