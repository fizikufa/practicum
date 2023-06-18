import itemStyles from "./burger-ingredients-item.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient } from "../../../utils/types";
import Modal from "../../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import { useDrag } from "react-dnd";
import {
  OPEN_INGREDIENT_DETAILS,
  CLOSE_INGREDIENT_DETAILS,
} from "../../../services/actions/ingredients";
import { useCallback } from "react";

interface IBurgerIngredientItemProps {
  ingredient: Ingredient;
}

function BurgerIngredientItem({ ingredient }: IBurgerIngredientItemProps) {
  const dispatch = useDispatch();
  const ingredientDetails = useSelector(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    //Пока не осилил ts потом приведу в порядок
    (state) => state.ingredientDetails.ingredientDetails
  );



  // Содержание заказа
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  //Пока не осилил ts потом приведу в порядок
  const orderData = useSelector((state) => state.order.orderData);

  const orderCount = useCallback(
    (ingredient: Ingredient) => {
      const { _id, type } = ingredient;
      const ingredientsCount = orderData.filter(
        (element: Ingredient) => element._id === _id
      ).length;
      return type === "bun" ? ingredientsCount * 2 : ingredientsCount;
    },
    [orderData]
  );

  const count = orderCount(ingredient);

  const handleOpenIngredientModal = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, payload: ingredient });
  };

  const handleCloseIngredientModal = () => {
    dispatch({ type: CLOSE_INGREDIENT_DETAILS });
  };

  //  Ингредиенты перетаскиваемые
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: ingredient,
  });

  return (
    <>
      <div
        className={`${itemStyles.item} ml-4 mr-5 mb-10 mt-6`}
        onClick={handleOpenIngredientModal}
        ref={dragRef}
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
      {ingredientDetails === ingredient && (
        <Modal
          onClick={handleCloseIngredientModal}
          title={"Детали ингредиента"}
        >
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )}
    </>
  );
}

export default BurgerIngredientItem;
