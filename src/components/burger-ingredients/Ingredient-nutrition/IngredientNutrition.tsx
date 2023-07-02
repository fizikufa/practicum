import React, { FC } from 'react';
import IngredientNutritionStyle from './IngredientNutrition.module.css';


interface INutritionProps {
  amount: number;
  type: string;
}

export const IngredientNutrition: FC<INutritionProps> = ({ type, amount }) => {
  return (
    <div className={IngredientNutritionStyle.nutrition}>
      <p className='mb-2 text text_type_main-default text_color_inactive'>{type}</p>
      <p className='text text_type_digits-default text_color_inactive'>{amount}</p>
    </div>
  )
}

export default React.memo(IngredientNutrition);