import { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState, TWSAction } from '../../utils/types';  //
import { authTokens } from '../../utils/auth';

export const wsMiddleware = (wsUrl: string, wsActions: TWSAction, auth: boolean): Middleware => (store: MiddlewareAPI<AppDispatch, RootState>) => {
  let socket: WebSocket | undefined;

  return (next) => (action) => {
    const { dispatch } = store;
    const { type, payload } = action;
    const {
      wsInit,
      wsClose,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    const { accessToken } = authTokens();
    const token = auth ? accessToken : null;

    if (type === wsInit) {
      socket = token
        ? new WebSocket(`${wsUrl}?token=${token}`)
        : new WebSocket(`${wsUrl}`);
    }
  
    if (socket) {
      socket.onopen = (event) => {
        dispatch({ type: onOpen, payload: event });
      };

      socket.onerror = (event) => {
        dispatch({ type: onError, payload: event });
      };
  
      socket.onmessage = (event) => {
        const { data } = event;
        const parsedData = JSON.parse(data);
        const { success, ...restParsedData } = parsedData;
        dispatch({ type: onMessage, payload: restParsedData });
      };
   
      socket.onclose = (event) => {
        dispatch({ type: onClose, payload: event });
        console.log('socket closed with code: ', event.code);
      };

      if (wsClose && type === wsClose && socket) {
        socket.close(1000, 'socket closed');     
      }
    
      if (wsSendMessage && type === wsSendMessage && socket) {
        const message = token ? { ...payload, token } : { ...payload };
        socket.send(JSON.stringify(message));
      }
    }

    next(action);
  };
};