import itemStyles from "./burger-ingredients-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../../utils/types";
import Modal from "../../modal/modal";
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useModal } from "../../../hooks/useModal";
import { BurgerContext, EnumActions } from "../../../context/burger-context";
import { useContext } from "react";

interface IBurgerIngredientItemProps {
  ingredient: TIngredient;
}

function BurgerIngredientItem({ ingredient }: IBurgerIngredientItemProps) {
  const { burgerState, burgerDispatch } = useContext(BurgerContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const onClick = () => {
    openModal();
    burgerDispatch({
      type: EnumActions.add,
      payload: ingredient
    })
  };

  let count = 0;
  if (burgerState.bun?._id === ingredient._id) {
    count = 1;
  } else {
    count = burgerState.ingredients.filter(
      (item) => item === ingredient
    ).length;
  }

  return (
    <>
      <div
        className={`${itemStyles.item} ml-4 mr-5 mb-10 mt-6`}
        onClick={onClick}
      >
        <img
          className={`${itemStyles.item_image} ml-4 mr-5`}
          alt={ingredient.name}
          src={ingredient.image}
        />
        <div className={`${itemStyles.price} mb-1 mt-1`}>
          <p className="text text_type_digits-small mr-2">{ingredient.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={itemStyles.name}>{ingredient.name}</p>
        {count > 0 && <Counter count={count} size="default" />}
      </div>
      <Modal
        onClick={closeModal}
        isOpen={isModalOpen}
        title={"Детали ингредиента"}
      >
        <IngredientDetails ingredient={ingredient} />
      </Modal>
    </>
  );
}

export default BurgerIngredientItem;
