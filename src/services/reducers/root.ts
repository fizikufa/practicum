import { combineReducers } from 'redux';
import { wsAuthOrdersReducer } from './ws-auth';
import { wsOrdersReducer } from './ws';
import { authReducer } from './auth';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  ws: wsOrdersReducer,
  wsAuth: wsAuthOrdersReducer,
});