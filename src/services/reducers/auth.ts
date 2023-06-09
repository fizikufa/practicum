import { TAuthActions } from '../actions/auth'
import {
    REGISTER_USER_API,
    REGISTER_USER_API_OK,
    REGISTER_USER_API_FAIL,
    LOGIN_USER_API,
    LOGIN_USER_API_OK,
    LOGIN_USER_API_FAIL,
    GET_USER_PROFILE_API,
    GET_USER_PROFILE_API_OK,
    GET_USER_PROFILE_API_FAIL,
    UPDATE_USER_PROFILE_API,
    UPDATE_USER_PROFILE_API_OK,
    UPDATE_USER_PROFILE_API_FAIL,
    REFRESH_TOKEN_API,
    REFRESH_TOKEN_API_OK,
    REFRESH_TOKEN_API_FAIL,
    PASSWORD_RESET_API,
    PASSWORD_RESET_API_OK,
    PASSWORD_RESET_API_FAIL,
    PASSWORD_RESET_CODE_API,
    PASSWORD_RESET_CODE_API_OK,
    PASSWORD_RESET_CODE_API_FAIL,
    LOGOUT_USER_API,
    LOGOUT_USER_API_OK,
    LOGOUT_USER_API_FAIL,
  } from '../../utils/constants';
import { TUser } from '../../utils/types';
  

  type TAuthState = {
    user: null|TUser,
    request: boolean,
    requestFailed: boolean,
    hasResetCode: boolean,
  };
  

  const initialState:TAuthState = {
    user: null,
    request: false,
    requestFailed: false,
    hasResetCode: false,
  };
  

  export const authReducer = (state = initialState, action:TAuthActions) => {
    switch (action.type) {
      case REGISTER_USER_API:
        return {
          ...state,
          request: true,
        };
      case REGISTER_USER_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          user: action.payload,
        };
      case REGISTER_USER_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      case LOGIN_USER_API:
        return {
          ...state,
          request: true,
        };
      case LOGIN_USER_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          user: action.payload,
        };
      case LOGIN_USER_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      case PASSWORD_RESET_CODE_API:
        return {
          ...state,
          request: true,
        };
      case PASSWORD_RESET_CODE_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          hasResetCode: true,
        };
      case PASSWORD_RESET_CODE_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
          hasResetCode: false,
        };
      case PASSWORD_RESET_API:
        return {
          ...state,
          request: true,
        };
      case PASSWORD_RESET_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          hasResetCode: false,
        };
      case PASSWORD_RESET_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      case LOGOUT_USER_API:
        return {
          ...state,
          request: true,
        };
      case LOGOUT_USER_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          user: null,
        };
      case LOGOUT_USER_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      case GET_USER_PROFILE_API:
        return {
          ...state,
          request: true,
        };
      case GET_USER_PROFILE_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          user: action.payload,
        };
      case GET_USER_PROFILE_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      case UPDATE_USER_PROFILE_API:
        return {
          ...state,
          request: true,
        };
      case UPDATE_USER_PROFILE_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
          user: action.payload,
        };
      case UPDATE_USER_PROFILE_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      case REFRESH_TOKEN_API:
        return {
          ...state,
          request: true,
        };
      case REFRESH_TOKEN_API_OK:
        return {
          ...state,
          request: false,
          requestFailed: false,
        };
      case REFRESH_TOKEN_API_FAIL:
        return {
          ...state,
          request: false,
          requestFailed: true,
        };
      default:
        return state;
    }
  };