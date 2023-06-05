import itemStyles from "./burger-ingredients-item.module.css";
import {CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from '../../../utils/types';
import Modal from "../../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useModal } from "../../../hooks/useModal";

interface IBurgerIngredientItemProps{
  ingredient: TIngredient;
  getIngredientCountInOrder: (ingredient:TIngredient)=>number;
}

function BurgerIngredientItem({ingredient,getIngredientCountInOrder}: IBurgerIngredientItemProps) {
  const { isModalOpen, openModal, closeModal } = useModal(); 
  let count=getIngredientCountInOrder(ingredient);
  return (
    <>
    <div className={`${itemStyles.item} ml-4 mr-5 mb-10 mt-6`} onClick={openModal}>
      <img
        className={`${itemStyles.item_image} ml-4 mr-5`}
        alt={ingredient.name}
        src={ingredient.image}
      />
      <div className={`${itemStyles.price} mb-1 mt-1`}>
        <p className="text text_type_digits-small mr-2">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={itemStyles.name}>
        {ingredient.name}
      </p>
      {count>0&&<Counter count={count} size="default" />}
    </div>
     <Modal onClick={closeModal} isOpen={isModalOpen} title={'Детали ингредиента'}>
     <IngredientDetails ingredient={ingredient} />
   </Modal>
   </>
  );
}

export default BurgerIngredientItem;