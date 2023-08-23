import { expect } from '@jest/globals';
import { orderReducer, initialOrderState } from './order';

import {
  ADD_INGREDIENT,
  MOVE_INGREDIENT,
  REMOVE_INGREDIENT,
  ADD_BUN
} from '../../utils/constants';
import { ORDER, ORDER_SORTED, INGREDIENT_SAUCE, CARD_BUN } from '../../utils/testdata';


describe('orderReducer', () => {
  it('should return initial state', () => {
    expect(orderReducer(undefined, {} as any)).toEqual(initialOrderState);
  });

  it('should handle ADD_INGREDIENT', () => {
    expect(
      orderReducer(initialOrderState, {  
        type: ADD_INGREDIENT,
        payload: INGREDIENT_SAUCE,
      })
    ).toEqual({
      ...initialOrderState,
      orderData: [...initialOrderState.orderData, INGREDIENT_SAUCE],
    });
  });
 
  it('should handle REMOVE_INGREDIENT', () => {
    expect(
      orderReducer(initialOrderState, {
        type: REMOVE_INGREDIENT,
        payload: 'test',
      })
    ).toEqual({
      ...initialOrderState,
      orderData: initialOrderState.orderData.filter(
        (item) => item._uid !== 'test'
      ),
    });
  });

  it('should handle MOVE_INGREDIENT', () => {
    expect(
      orderReducer({ ...initialOrderState, orderData: ORDER.order.ingredients }, {
        type: MOVE_INGREDIENT,
        payload: {whichIngredientDroppedUid:'3', onWhichIngredientDroppedUid:'2'},
      })
    ).toEqual({
      ...initialOrderState,
      orderData: ORDER_SORTED.order.ingredients,
    });
  });

  it('should handle ADD_BUN', () => {
    expect(
      orderReducer(initialOrderState, {
        type: ADD_BUN,
        payload: CARD_BUN,
      })
    ).toEqual({
      ...initialOrderState,
      orderData: [CARD_BUN],
    });
  });
});