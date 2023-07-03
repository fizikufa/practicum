import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  order: orderReducer
});