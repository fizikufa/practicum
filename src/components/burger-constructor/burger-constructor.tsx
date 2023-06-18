import constructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Ingredient, IngredientInOrder, State } from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import {
  dispatchOrder,
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_ORDER,
} from "../../services/actions/order";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useDrop } from "react-dnd";
import BurgerConstructorElement from "./burger-constructor-element/burger-constructor-element";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const selectorOrders = (store: State) => store.order;
  const { orderData, orderNumber } = useSelector(selectorOrders);

  const bun = orderData.find(function (element: IngredientInOrder) {
    return element.type === "bun";
  });

  const midIngredients = orderData.filter(
    (element: IngredientInOrder) => element.type !== "bun"
  );

  const totalAmount = useMemo(() => {
    if (orderData.length > 0) {
      return orderData
        .map(
          (element: IngredientInOrder) =>
            element.price * (element.type === "bun" ? 2 : 1)
        )
        .reduce((sum: number, price: number) => sum + price, 0);
    } else {
      return 0;
    }
  }, [orderData]);

  const onDropIngredient = (ingredient: Ingredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { _uid: uuidv4(), ...ingredient },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredientData: IngredientInOrder) => onDropIngredient(ingredientData),
  });

  const handleOpenIngredientModal = () => {   
    dispatch(
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    //Пока не осилил ts потом приведу в порядок
      dispatchOrder(orderData.map((ingredient: IngredientInOrder) => ingredient._id))
    );
  };
  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };

  return (
    <>
      <section ref={dropTarget}>
        {bun && (
          <div className={constructorStyles.ingredient_bun}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + " (верх)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <div className={constructorStyles.inner_style}>
          {midIngredients!.map((data: IngredientInOrder, index: number) => {
            if (data.type !== "bun") {
              return (
                <div key={index} className={constructorStyles.ingredient}>
                  <BurgerConstructorElement
                    elementData={data}
                    bunType={undefined}
                    bunTypeName={""}
                    isLocked={false}
                    index={index}
                    key={data._id}
                  />
                </div>
              );
            }
            return null;
          })}
          {midIngredients.length === 0 && (
            <li className={constructorStyles.ingredient}>
              <span className="text mt-30 ml-30 text_type_main-default">
                Добавьте ингредиенты для Вашего бургера!
              </span>
            </li>
          )}
        </div>

        {bun && (
          <div className={constructorStyles.ingredient_bun}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + " (низ)"}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </section>
      {totalAmount > 0 && (
        <div className={constructorStyles.cart}>
          <div className={constructorStyles.total}>
            <p className={constructorStyles.p}>{totalAmount}</p>
            <CurrencyIcon type="primary" />
          </div>

          {bun && midIngredients.length > 0 && (
            <Button
              type="primary"
              size="large"
              htmlType="button"
              onClick={handleOpenIngredientModal}
            >
              Оформить заказ
            </Button>
          )}

          {orderNumber && (
            <Modal onClick={handleCloseOrderModal} title={"Детали заказа"}>
              <OrderDetails number={orderNumber} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
}

export default BurgerConstructor;
