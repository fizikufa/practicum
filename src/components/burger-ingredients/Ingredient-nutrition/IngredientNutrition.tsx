import ingredientNutritionStyle from './IngredientNutrition.module.css';

interface IIngredientNutritionProps{
    type: string;
    amount: number;
}

function IngredientNutrition ({type, amount}:IIngredientNutritionProps) {
    return (
      <div className={ingredientNutritionStyle.nutrition}>
        <p className='mb-2 text text_type_main-default text_color_inactive'>{type}</p>
        <p className='text text_type_digits-default text_color_inactive'>{amount}</p>
      </div>
    )
  }

  export default IngredientNutrition