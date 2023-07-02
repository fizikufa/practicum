import React, { FC, useMemo } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "../../hooks/useSelector";
import { useDrop } from "react-dnd";
import ConstructorElements from "./burger-constructor-element/burger-constructor-element";
import OrderDetails from "../order-details/order-details";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal";
import { dispatchOrder } from "../../services/actions/order";
import { v4 as uuidv4 } from "uuid";
import { ADD_BUN, ADD_INGREDIENT, DELETE_ORDER } from "../../utils/constants"; //
import { getUser, getBurgerData } from "../../utils/state";
import { TIngredient } from "../../utils/types";
import burgerConstructorStyle from "./burger-constructor.module.css";

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orderNumber } = useSelector((state) => state.order);
  const burgerData = useSelector(getBurgerData);
  const user = useSelector(getUser);

  const bun = burgerData.find(function (element) {
    return element.type === "bun";
  });

  const ingredientsMidStuff = burgerData.filter(
    (element) => element.type !== "bun"
  );

  const totalAmount = useMemo(() => {
    if (burgerData.length > 0) {
      return burgerData
        .map((element) => element.price * (element.type === "bun" ? 2 : 1))
        .reduce((sum, price) => sum + price, 0);
    } else {
      return 0;
    }
  }, [burgerData]);

  const onDropIngredient = (ingredient: TIngredient) => {
    if (ingredient.type === "bun") {
      dispatch({
        type: ADD_BUN,
        payload: { ...ingredient, _uid: uuidv4() },
      });
    } else {
      dispatch({
        type: ADD_INGREDIENT,
        payload: { ...ingredient, _uid: uuidv4() },
      });
    }
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop: (ingredientData: TIngredient) => onDropIngredient(ingredientData),
  });

  const handleOpenIngredientModal = () => {
    user
      ? dispatch(dispatchOrder(burgerData.map((ingredient) => ingredient._id)))
      : navigate("/login");
  };

  const handleCloseOrderModal = () => {
    dispatch({ type: DELETE_ORDER });
  };

  return (
    <>
      <section
        className={`${burgerConstructorStyle.element__section}`}
        ref={dropTarget}
      >
        <div className={`${burgerConstructorStyle.element__container}`}>
          <ul className={`${burgerConstructorStyle.element__list}`}>
            {bun ? (
              <li className={`${burgerConstructorStyle.element__bun}`}>
                <ConstructorElement
                  type={"top"}
                  isLocked={true}
                  text={`${bun.name} (верх)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </li>
            ) : (
              <div className={burgerConstructorStyle.element__bun}>
                <div className={burgerConstructorStyle.empty_bun_top}>
                  <p className="text text_type_main-default text_color_inactive">
                    Добавьте булку
                  </p>
                </div>
              </div>
            )}

            <ul className={`${burgerConstructorStyle.element_midstuff}`}>
              {ingredientsMidStuff.map((element, index) => {
                return (
                  <li
                    key={element._id}
                    className={burgerConstructorStyle.element}
                  >
                    <ConstructorElements
                      elementData={element}
                      bunTypeName={""}
                      isLocked={false}
                      index={index}
                      key={element._id}
                    />
                  </li>
                );
              })}
              {ingredientsMidStuff.length === 0 && (                
                <li className={burgerConstructorStyle.element}>
                  <div className={burgerConstructorStyle.empty_filling}>
                    <p className="text text_type_main-default text_color_inactive">
                      Добавьте ингредиенты
                    </p>
                  </div>
                </li>
              )}
            </ul>
            {bun ? (
              <li className={`${burgerConstructorStyle.element__bun}`}>
                <ConstructorElement
                  type={"bottom"}
                  isLocked={true}
                  text={`${bun.name} (низ)`}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </li>
            ) : (
              <div className={burgerConstructorStyle.element__bun}>
                <div className={burgerConstructorStyle.empty_bun_bottom}>
                  <p className="text text_type_main-default text_color_inactive">
                    Добавьте булку
                  </p>
                </div>
              </div>
            )}
          </ul>
          {ingredientsMidStuff.length > 0 && (
            <div
              className={`mt-10 mr-5 ${burgerConstructorStyle.constructor_total}`}
            >
              <div className={burgerConstructorStyle.containerTotal}>
                <p className="mr-2 text text_type_digits-medium">
                  {totalAmount}
                </p>
                <CurrencyIcon type="primary" />
              </div>
              <Button
                type="primary"
                size="large"
                htmlType="button"
                onClick={handleOpenIngredientModal}
              >
                Оформить заказ
              </Button>
            </div>
          )}
        </div>
      </section>
      {orderNumber && (
        <Modal onClick={handleCloseOrderModal} title={"Детали заказа"}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}
    </>
  );
};

export default React.memo(BurgerConstructor);
