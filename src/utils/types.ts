import { store } from '../services/store/store';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { TIngredientActions } from '../services/actions/ingredients';
import { TAuthActions } from '../services/actions/auth';
import { TOrderActions } from '../services/actions/order';

type TAppActions = TIngredientActions | TOrderActions | TAuthActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TAppActions>
>;

//объект ингредиента 
export type TIngredient = {
    _id: string; 
    name: string;
    image: string;
    image_mobile: string;
    image_large: string;
    price: number;
    type: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    __v: number;
  }  

  //объект ингредиента в заказе
  export type TIngredientInOrder = TIngredient & { _uid: string; }

  export interface TIngredients{
    ingredients: TIngredient[], 
    ingredientsRequest: boolean,
    ingredientsFailed: boolean
  }

 export interface TIngredientDetails{
  IngredientDetails: TIngredient
  }

  export interface Order{
    orderData: TIngredientInOrder[], 
    orderNumber: string,
    orderRequest: boolean,
    orderRequestFailed: boolean
  }

  

export type TUser = {
  name: string;
  email: string;
  password: string;
}

export type TFormValues = {
  name?: string;
  email?: string;
  password?: string;
  token?: string;
}

export type TOrder = {
  _id: string;
  number: number;
  name: string;
  status: string;
  createdAt: Date;
  ingredients: string[];
}


export type TResponse<T> = {
  user: import('../services/actions/auth').IUpdateUserProfileOK;
  success: boolean;
} & T;


export type TTokenResponse = {
  accessToken: string;
  refreshToken: string;
};


export type TUserResponse = {
  user: TUser;
};


export type TAuthResponse = TTokenResponse & TUserResponse;


export type TIngredientResponse = {
  data: TIngredient[];
};


export type TOrderResponse = {
  order: TOrder;
};