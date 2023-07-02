import { TIngredientInOrder } from '../../utils/types';
import { TOrderActions } from '../actions/order'
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

type TOrderState = {
  orderData: TIngredientInOrder[];
  orderNumber: null|number
  orderRequest: boolean;
  orderRequestFailed: boolean;
};

const initialOrderState:TOrderState = {
  orderData: [],
  orderNumber: null,
  orderRequest: false,
  orderRequestFailed: false
};


export const orderReducer = (state = initialOrderState, action:TOrderActions):TOrderState => {
  switch (action.type) {
    case ADD_BUN: {
      const bunIndex = state.orderData.findIndex(
        (elem) => elem.type === 'bun'
      );

      const bun = action.payload as TIngredientInOrder; 
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
        orderData: [...state.orderData, action.payload as TIngredientInOrder]
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

      const burgerData = [...state.orderData];
      const draggedItemIndex = burgerData.findIndex(
        (ingredient) => ingredient._uid === whichIngredientDroppedUid
      );
      const hoveredItemIndex = burgerData.findIndex(
        (ingredient) => ingredient._uid === onWhichIngredientDroppedUid
      );

      const draggedItem = burgerData[draggedItemIndex];
      const hoveredItem = burgerData[hoveredItemIndex];

      burgerData[draggedItemIndex] = hoveredItem;
      burgerData[hoveredItemIndex] = draggedItem;

      return {
        ...state,
        orderData: burgerData,
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