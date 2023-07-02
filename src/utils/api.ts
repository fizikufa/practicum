import { baseurl } from "./constants";
import { getCookie, setCookie, deleteCookie, authTokens } from './auth';

import { 
  TResponse,
  TAuthResponse, 
  TTokenResponse, 
  TUserResponse,
  TIngredientResponse, 
  TOrderResponse,
  TFormValues
 } from './types';


//Обрабатываю ответ сервера - возвращаю json или ошибку 
const checkResponse = <T>(res: Response) => {
  return res.ok 
    ? res.json().then((data) => data as TResponse<T>) 
    : Promise.reject(res);
};


export type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
  }>;

//  Получаю ингредиенты с сервера и записываю в массив  //
export const fetchIngredients = () => {
  return fetch(`${baseurl}/ingredients`)
  .then((res) => checkResponse<TIngredientResponse>(res));
}

//  Установка токенов - реализовали по месту в auth  //
export const setTokens = (accessToken: string, refreshToken: string) => {
  setCookie('accessToken', accessToken);
  setCookie('refreshToken', refreshToken);
}

//  Удаление токенов  //
export const deleteTokens = () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
}

//  Получение токена и рефреш токена из куки  //
export const refreshToken = async ():Promise<TRefreshResponse> => {
  return await fetch(`${baseurl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({'token': `${getCookie('refreshToken')}`})
  })
  .then((res) => checkResponse<TRefreshResponse>(res))
  .then((refreshData) => {
    if (refreshData.success) {
      setTokens(refreshData.accessToken.split('Bearer ')[1], refreshData.refreshToken);
      return refreshData
    }
    return Promise.reject(refreshData);
  })
}

export const fetchWithRefresh = async <T>(url:string, options:RequestInit) => {
  try {
    return await fetch(url, options).then(res =>checkResponse<T>(res));
  } catch (error) {
    if ((error as {status: number}).status === 403) {
      return await refreshToken().then(refreshData => {
        (options.headers as { [key: string]: string}).Authorization = refreshData.accessToken;
        return fetch(url, options).then(res =>checkResponse<T>(res));}        
      );      
    } else {
      return Promise.reject(error);
    }
  }
}

//Регистрация
export const registrationApi = async ({ email, password, name }:TFormValues) => {
  try {
      return await fetch(`${baseurl}/auth/register`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, password, name }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка regApi: ${error}`);
  }
};

//Авторизация
export const loginApi = async ({ email, password }:TFormValues) => {
  try {
    return await fetch(`${baseurl}/auth/login`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, password }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка loginApi: ${error}`);
  }
};

//Получение данных профиля юзера
export const getUserProfileApi = async () => {
  try {
    const { accessToken } = authTokens();
    return await fetch(`${baseurl}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }).then(res => checkResponse<TUserResponse>(res));
  } catch (error) {
    console.log(`Ошибка getUserProfileApi: ${error}`);
  }
};

//Обновления профиля юзера  
export const updateUserProfileApi = async ({ email, password, name }:TFormValues) => {
  try {
    const { accessToken } = authTokens();
    return await fetchWithRefresh<TUserResponse>(`${baseurl}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ email, password, name }),
    });
  } catch (error) {
    console.log(`Ошибка updateUserProfileApi: ${JSON.stringify(error)}`);
  }
};

//Получение рефреш токена 
export const accessTokenApi = async (refreshToken:string|undefined) => {
  try {
    return await fetch(`${baseurl}/auth/token`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ token: refreshToken }),
    }).then((res) => checkResponse<TTokenResponse>(res));
  } catch (error) {
    console.log(`Ошибка accessTokenApi: ${error}`);
  }
};


export const postOrder = async (ingredientsID: string[]) => {
  try {
    const { accessToken } = authTokens();
    return await fetch(`${baseurl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },   
      body: JSON.stringify({
        ingredients: ingredientsID
      }),
    }).then(res => checkResponse<TOrderResponse>(res));
  } catch (error) {
    console.log(`Ошибка отправки заказа: ${error}`);
  }
};

//Получение кода для смены пароля
export const codeRequestApi = async ({ email }:TFormValues) => {
  try {
    return await fetch(`${baseurl}/password-reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({email: email}),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка codeRequestApi: ${error}`);
  }
};

//Смена пароля 
export const resetPasswordApi = async ({ password, token }:TFormValues) => {
  try {
    return await fetch(`${baseurl}/password-reset/reset`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ password, token }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка resetPasswordApi: ${error}`);
  }
};

//Выход из системы
export const logoutApi = async (refreshToken:string|undefined) => {
  try {
    return await fetch(`${baseurl}/auth/logout`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ token: refreshToken }),
    }).then(res => checkResponse<TAuthResponse>(res));
  } catch (error) {
    console.log(`Ошибка logoutApi: ${error}`);
  }
};