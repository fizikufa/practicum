import { expect } from '@jest/globals';
import { wsOrdersReducer, WSInitialState } from './ws';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../utils/constants';

import { WSORDERDATA, WSORDERDATA_SIMPLE } from '../../utils/testdata';

describe('wsOrdersReducer test', () => {
  it("should return initial state", () => {
    expect(wsOrdersReducer(undefined, {} as any)).toEqual(WSInitialState);
  });

  it("should handle WS_CONNECTION_START", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: WS_CONNECTION_START
      })
    ).toEqual({ ...WSInitialState, error: undefined });
  });

  it("should handle WS_CONNECTION_SUCCESS", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: WS_CONNECTION_SUCCESS,
      })
    ).toEqual({ ...WSInitialState, error: null, wsConnected: true });
  });

  it("should handle WS_CONNECTION_ERROR", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: WS_CONNECTION_ERROR,
        payload: {} as any,
      })
    ).toEqual({ ...WSInitialState, error: {}, wsConnected: false });
  });

  it("should handle WS_CONNECTION_CLOSED", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: WS_CONNECTION_CLOSED,
      })
    ).toEqual({ ...WSInitialState, error: undefined, wsConnected: false });
  });

  it("should handle WS_GET_MESSAGE", () => {
    expect(
      wsOrdersReducer(WSInitialState, {
        type: WS_GET_MESSAGE,
          payload: { 
            success: WSORDERDATA.success,
            orders: WSORDERDATA.orders,
            total: WSORDERDATA.total,
            totalToday: WSORDERDATA.totalToday
          },
      })
    ).toEqual({ ...WSInitialState, error: undefined, ...WSORDERDATA_SIMPLE });
  });
});