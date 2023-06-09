export const baseurl = 'https://norma.nomoreparties.space/api';

//  Константы для API ингредиентов
export const GET_INGREDIENTS_API = 'GET_INGREDIENTS_API';
export const GET_INGREDIENTS_API_OK = 'GET_INGREDIENTS_API_OK';
export const GET_INGREDIENTS_API_FAIL = 'GET_INGREDIENTS_API_FAIL';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

//Константы роутов
export const HOMEURL = '/';
export const REGURL = '/register';
export const LOGINURL = '/login';
export const PROFILEURL = '/profile';
export const FORGOTURL = '/forgot-password';
export const RESETPASSURL = '/reset-password';
export const INGREDIENTSURL = '/ingredients';
export const FEEDURL = '/feed';
export const ORDERSURL = '/orders';
export const PROFILEORDERSURL = '/profile/orders';
export const ORDERSID = '/profile/orders/:id';
export const INGREDIENTSID = '/ingredients/:id';
export const NOTFOUNDURL = '/*';

//Константы для просмотра данных об ингредиенте 
export const OPEN_INGREDIENT_DETAILS = 'OPEN_INGREDIENT_DETAILS';
export const CLOSE_INGREDIENT_DETAILS = 'CLOSE_INGREDIENT_DETAILS';

//Действия с заказом 
export const POST_ORDER_API = 'POST_ORDER_API';
export const POST_ORDER_API_OK = 'POST_ORDER_API_OK';
export const POST_ORDER_API_FAIL = 'POST_ORDER_API_FAIL';
export const DELETE_ORDER = 'DELETE_ORDER';

//для API авторизации
export const LOGIN_USER_API = 'LOGIN_USER_API';
export const LOGIN_USER_API_OK = 'LOGIN_USER_API_OK';
export const LOGIN_USER_API_FAIL = 'LOGIN_USER_API_FAIL';
export const REGISTER_USER_API = 'REGISTER_USER_API';
export const REGISTER_USER_API_OK = 'REGISTER_USER_API_OK';
export const REGISTER_USER_API_FAIL = 'REGISTER_USER_API_FAIL';
export const GET_USER_PROFILE_API = 'GET_USER_PROFILE_API';
export const GET_USER_PROFILE_API_OK = 'GET_USER_PROFILE_API_OK';
export const GET_USER_PROFILE_API_FAIL = 'GET_USER_PROFILE_API_FAIL';
export const UPDATE_USER_PROFILE_API = 'UPDATE_USER_PROFILE_API';
export const UPDATE_USER_PROFILE_API_OK = 'UPDATE_USER_PROFILE_API_OK';
export const UPDATE_USER_PROFILE_API_FAIL = 'UPDATE_USER_PROFILE_API_FAIL';
export const ACCESS_TOKEN_API = 'ACCESS_TOKEN_API';
export const ACCESS_TOKEN_API_OK = 'ACCESS_TOKEN_API_OK';
export const ACCESS_TOKEN_API_FAIL = 'ACCESS_TOKEN_API_FAIL';
export const REFRESH_TOKEN_API = 'REFRESH_TOKEN_API';
export const REFRESH_TOKEN_API_OK = 'REFRESH_TOKEN_API_OK';
export const REFRESH_TOKEN_API_FAIL = 'REFRESH_TOKEN_API_FAIL';
export const PASSWORD_RESET_API = 'PASSWORD_RESET_API';
export const PASSWORD_RESET_API_OK = 'PASSWORD_RESET_API_OK';
export const PASSWORD_RESET_API_FAIL = 'PASSWORD_RESET_API_FAIL';
export const PASSWORD_RESET_CODE_API = 'PASSWORD_RESET_CODE_API';
export const PASSWORD_RESET_CODE_API_OK = 'PASSWORD_RESET_CODE_API_OK';
export const PASSWORD_RESET_CODE_API_FAIL = 'PASSWORD_RESET_CODE_API_FAIL';
export const LOGOUT_USER_API = 'LOGOUT_USER_API';
export const LOGOUT_USER_API_OK = 'LOGOUT_USER_API_OK';
export const LOGOUT_USER_API_FAIL = 'LOGOUT_USER_API_FAIL';