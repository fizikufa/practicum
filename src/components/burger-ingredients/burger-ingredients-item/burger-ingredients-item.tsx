import React, { useCallback, FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../../hooks/useSelector';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../../utils/types';
import { getBurgerData } from '../../../utils/state';
import IngredientItemStyle from './burger-ingredients-item.module.css';


interface IBurgerIngredientProps {
  ingredient: TIngredient;
}

export const BurgerIngredientsItem: FC<IBurgerIngredientProps> = ( { ingredient } ) => {

  const navigate = useNavigate();
  const location = useLocation();  

  const orderData = useSelector(getBurgerData);

  const count = useCallback(
    (ingredient: TIngredient) => {
      const { _id, type } = ingredient;
      const ingredientsCount = orderData.filter(
        (el) => el._id === _id
      ).length;
      return type === 'bun' ? ingredientsCount * 2 : ingredientsCount;
    },
    [orderData]
  );


  const handleOpenIngredientModal = useCallback(() => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { ingredientModal: location },
    });
  }, [navigate, location, ingredient._id]);


  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: ingredient
  });



  return (
    <>
      <div
        className={`${IngredientItemStyle.item} ml-4 mr-5 mb-10 mt-6`}
        onClick={handleOpenIngredientModal}
        ref={dragRef}
      >
        <img
          className={`${IngredientItemStyle.item_image} ml-4 mr-5`}
          alt={ingredient.name}
          src={ingredient.image}
        />
        <div className={`${IngredientItemStyle.price} mb-1 mt-1`}>
          <p className="text text_type_digits-small mr-2">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={IngredientItemStyle.name}>{ingredient.name}</p>
        {count(ingredient) > 0 && <Counter count={count(ingredient)} size="default" />}
      </div>     
    </>
  );

};


export default React.memo(BurgerIngredientsItem);