
import {
    WS_CONNECTION_SUCCESS_AUTH,
    WS_CONNECTION_ERROR_AUTH,
    WS_CONNECTION_CLOSED_AUTH,
    WS_GET_MESSAGE_AUTH,
  } from '../../utils/constants';
  
  import { TWSConnectionAuthActions } from '../actions/ws-actions';
  
  import { TOrder } from '../../utils/types';
  
  export type TWSAuthState = {
    wsConnected: boolean;
    orders: Array<TOrder>;
    error?: Event | null,
    total: number | null;
    totalToday: number | null;
  };
  
  export const WSInitialAuthState: TWSAuthState = {
    wsConnected: false,
    orders: [],
    error: null,
    total: null,
    totalToday: null,
  };
  
  export const wsAuthOrdersReducer = (
    state = WSInitialAuthState,
    action: TWSConnectionAuthActions
    ): TWSAuthState => {
  
    switch (action.type) {
       case WS_CONNECTION_SUCCESS_AUTH:
        return {
          ...state,
          error: undefined,
          wsConnected: true,
        };

        case WS_CONNECTION_ERROR_AUTH:
        return {
          ...state,
          error: action.payload,
          wsConnected: false,
        };

      case WS_CONNECTION_CLOSED_AUTH:
        return {
          ...state,
          error: undefined,
          wsConnected: false,
        };

      case WS_GET_MESSAGE_AUTH:
        return {
          ...state,
          error: undefined,
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          orders: action.payload.orders,
        };
      default:
        return state;
    }
  };