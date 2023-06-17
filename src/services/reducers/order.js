//  Редьюсер для заказов в redux store   //
import {
    ADD_INGREDIENT,
    MOVE_INGREDIENT,
    REMOVE_INGREDIENT,
    ADD_BUN,
    POST_ORDER_API,
    POST_ORDER_API_OK,
    POST_ORDER_API_FAIL,
    DELETE_ORDER
  } from '../actions/order';
  
  //  Начальное состояние заказа
  const initialOrderState = {
    orderData: [],
    orderNumber: null,
    orderRequest: false,
    orderRequestFailed: false
  };
  

  export const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
      case ADD_BUN: {
        const bunIndex = state.orderData.findIndex(
          (elem) => elem.type === 'bun'
        );

        const bun = action.payload;
           const orderIngredients = [...state.orderData];
        if (bunIndex >= 0) {
          orderIngredients.splice(bunIndex, 1, bun);
        } else {
          orderIngredients.push(bun);
        }
        return {
          ...state,
          orderData: orderIngredients
        };
      }

      case ADD_INGREDIENT:
        return {
          ...state,
          orderData: [...state.orderData, action.payload]
        };

      case REMOVE_INGREDIENT: {
        return {
          ...state,
          orderData: state.orderData.filter(
            (ingredient) => ingredient._uid !== action.payload
          ),
        };
      }
      case MOVE_INGREDIENT: {
        const { whichIngredientDroppedUid, onWhichIngredientDroppedUid } =
          action.payload;
  
        const orderData = [...state.orderData];
        const draggedItemIndex = orderData.findIndex(
          (ingredient) => ingredient._uid === whichIngredientDroppedUid
        );
        const hoveredItemIndex = orderData.findIndex(
          (ingredient) => ingredient._uid === onWhichIngredientDroppedUid
        );
  
        const draggedItem = orderData[draggedItemIndex];
        const hoveredItem = orderData[hoveredItemIndex];
  
        orderData[draggedItemIndex] = hoveredItem;
        orderData[hoveredItemIndex] = draggedItem;
  
        return {
          ...state,
          orderData,
        };
      }

      case POST_ORDER_API: {
        return {
          ...state,
          orderRequest: true
        };
      }

      case POST_ORDER_API_OK: {
        return {
          ...state,
          orderRequestFailed: false,
          orderNumber: action.payload,
          orderRequest: false
        };
      }

      case POST_ORDER_API_FAIL: {
        return { ...state, orderRequestFailed: true, orderRequest: false };
      }

      case DELETE_ORDER:
        return {
          ...state,
          orderNumber: null,
          orderData: [],
          orderRequest: false
        };
   
      default:
        return state;
    }
  };