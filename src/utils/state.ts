import { TUser, TIngredient, TIngredientInOrder, TOrder  } from './types';

export const getUser = (state: { auth: { user: TUser|null; }; }) => state.auth.user;
export const getItems = (state: { ingredients: { ingredients: TIngredient[]; }; }) => state.ingredients.ingredients;
export const getResetCode = (state: { auth: { hasResetCode: boolean; }; }) => state.auth.hasResetCode;
export const getOrders = (state: { order: { orderData: TOrder[]; }; }) => state.order.orderData;
export const getBurgerData = (state: { order: { orderData: TIngredientInOrder[]; }; }) => state.order.orderData;