import ingredientDetailsStyle from './ingredient-details.module.css';
import { TIngredient } from '../../../../utils/types'
import IngredientNutrition from './IngredientNutrition/IngredientNutrition';
import React from 'react';

interface IIngredientDetailsProps{
    ingredient: TIngredient;
}

function IngredientDetails({ingredient}:IIngredientDetailsProps){
  return(
    <div className={ingredientDetailsStyle.general}>      
      <img className={ingredientDetailsStyle.image} src={ingredient.image} alt={ingredient.name}></img>
      <p className='mt-4 mb-8 text text_type_main-medium'>{ingredient.name}</p>
      <div className={ingredientDetailsStyle.details}>
        <IngredientNutrition type={'Калории, ккал'} amount={ingredient.calories} />
        <IngredientNutrition type={'Белки, г'} amount={ingredient.proteins} />
        <IngredientNutrition type={'Жиры, г'} amount={ingredient.fat} />
        <IngredientNutrition type={'Углеводы, г'} amount={ingredient.carbohydrates} />
      </div>
    </div>  
  )    
}

export default IngredientDetails;