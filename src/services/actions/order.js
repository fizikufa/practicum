import { createOrder } from '../../utils/api';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

export const POST_ORDER_API = 'POST_ORDER_API';
export const POST_ORDER_API_OK = 'POST_ORDER_API_OK';
export const POST_ORDER_API_FAIL = 'POST_ORDER_API_FAIL';
export const DELETE_ORDER = 'DELETE_ORDER';


export const dispatchOrder  = (orderDataID) => {
  return function (dispatch) {
    dispatch({
      type: POST_ORDER_API,
    });
    createOrder({
      ingredients: orderDataID
    }).then((res) => {
      if (res && res.success) {
        dispatch({
          type: POST_ORDER_API_OK,
          payload: res.order.number,
        });
      } else {
        dispatch({
          type: POST_ORDER_API_FAIL,
        });
      }
    });
  };
};