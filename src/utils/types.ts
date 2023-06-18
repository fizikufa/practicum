//  объект ингредиента  //
export type Ingredient = {
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

  export type IngredientInOrder = {
    _uid: string; 
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

  export interface Ingredients{
    ingredients: Ingredient[], 
    ingredientsRequest: boolean,
    ingredientsFailed: boolean
  }

 export interface IngredientDetails{
  IngredientDetails: Ingredient
  }

  export interface Order{
    orderData: IngredientInOrder[], 
    orderNumber: string,
    orderRequest: boolean,
    orderRequestFailed: boolean
  }

  export interface State {
    ingredients: Ingredients;
    ingredientDetails: IngredientDetails, 
    order: Order        
}
  
