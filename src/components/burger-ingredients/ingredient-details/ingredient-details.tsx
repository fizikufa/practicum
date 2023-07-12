import { useState, useEffect } from 'react';
import { useSelector } from '../../../hooks/useSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientNutrition } from '../Ingredient-nutrition/IngredientNutrition';
import { TIngredient } from '../../../utils/types';
import ingredientDetailsStyle from './ingredient-details.module.css';

export const IngredientDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { items } = useSelector((state) => state.ingredients);
  const [item, setItem] = useState<TIngredient>();

  useEffect(
    () => {
      if (items.length > 0) {
        const ingredient = items.find((el:TIngredient) => el._id === id);
        if (!ingredient) {
          setItem(undefined);
          navigate('/', { replace: true });
        } else {
          setItem(ingredient);
        }

      }
    },
    [id, items, navigate]
  );

  if (item) {
    return (
      <>
        <div className={ingredientDetailsStyle.general}>
          <img className={ingredientDetailsStyle.image} src={item.image} alt={item.name} />
          <p className='mt-4 mb-8 text text_type_main-medium'>{item.name}</p>
          <div className={ingredientDetailsStyle.details}>
            <IngredientNutrition type={'Калории, ккал'} amount={item.calories} />
            <IngredientNutrition type={'Белки, г'} amount={item.proteins} />
            <IngredientNutrition type={'Жиры, г'} amount={item.fat} />
            <IngredientNutrition type={'Углеводы, г'} amount={item.carbohydrates} />
          </div>
        </div>
      </>
    );
  } else {
    return (<></>)
  }
};
