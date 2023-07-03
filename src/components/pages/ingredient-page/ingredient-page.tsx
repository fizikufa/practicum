import  AppHeader  from '../../app-header/app-header';
import { IngredientDetails } from '../../burger-ingredients/ingredient-details/ingredient-details';
import IngredientStyle from './ingredient-page.module.css';

export const IngredientPage = () => {

  return (
      <div className={IngredientStyle.container}>
        <h1 className='text text_type_main-large'>Детали ингредиента</h1>
        <IngredientDetails />
      </div>
  );
}

