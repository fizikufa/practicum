
import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
  } from '../../utils/constants';
  
  import { TWSConnectionActions } from '../actions/ws-actions';
  
  import { TOrder } from '../../utils/types';
  
  export type TWSState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    error?: Event | null,
    total: number | null;
    totalToday: number | null;
  };
  
  export const WSInitialState: TWSState = {
    wsConnected: false,
    orders: [],
    error: undefined,
    total: 0,
    totalToday: 0,
  };

  const wsOrdersReducer = (
    state = WSInitialState,
    action: TWSConnectionActions
  ): TWSState => {
  
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          error: null,
          wsConnected: true,
        };
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          error: action.payload,
          wsConnected: false,
        };
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          error: undefined,
          wsConnected: false,
        };
      case WS_GET_MESSAGE:
        return {
          ...state,
          error: undefined,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          orders: [...action.payload.orders],
        };
      default:
        return state;
    }
  };
  
  export { wsOrdersReducer };