import { Dispatch, createContext } from "react";
import { IState,TIngredient } from "../utils/types";

interface IContextProps {
    ingredients: TIngredient[]
    burgerState: IState;
    burgerDispatch: Dispatch<IActions>;
  }

 export const ingredientConstructorInitialState = {  
    bun: null,
    ingredients: [] as TIngredient[]
  } as IState
  
  export enum EnumActions {
    add = 'add',
    delete = 'delete',
    reset = 'reset'
  }
    
 export interface IActions {
    type: EnumActions;
    payload: TIngredient|TIngredient[];
  }
  
  
  export function ingredientConstructorReducer(state:IState, action:IActions) {
    switch (action.type) {
      case EnumActions.add:
        if ((action.payload as TIngredient).type === 'bun') {
            return {          
                ...state,
                bun: action.payload 
              } as IState;    
        }else{
            return {          
                ...state,
                ingredients: [
                  ...state.ingredients,
                  action.payload           
                ] 
              } as IState;    
        }       
      case EnumActions.reset:
        return {
          ...state,
          ingredients: [] as TIngredient[],
          bun: null
        } as IState;      
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }
  
export const BurgerContext = createContext({} as IContextProps);