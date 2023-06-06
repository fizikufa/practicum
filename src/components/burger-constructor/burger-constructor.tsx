import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredient } from "../../utils/types";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useModal } from "../../hooks/useModal";
import { BurgerContext, EnumActions } from "../../context/burger-context";
import { useContext, useState } from "react";
import { createOrder } from "../../utils/api";

function BurgerConstructor() {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { burgerState,  burgerDispatch} = useContext(BurgerContext);
  const midIngredients = burgerState.ingredients as TIngredient[];
  const bun = burgerState.bun as TIngredient;
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const checkOut = () => {
    setLoading(true);
    const body = {
      ingredients: midIngredients.map((item) => item._id),
    };
    createOrder(body).then((response) => {
      setOrderNumber(response.order.number);
      setLoading(false);
      openModal();
    });
  };

  const totalAmount =
    midIngredients.reduce((amount, item) => amount + item.price, 0) +
    (bun ? bun.price * 2 : 0);

  const handelDelete=(ingredient:TIngredient)=>{
    burgerDispatch({
      type: EnumActions.delete,
      payload: ingredient,
    });
  }

  return (
    <>
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
        {midIngredients!.map((data, index) => {
          const handleClose=()=>handelDelete(data);
          if (data.type !== "bun") {
            return (
              <div key={index} className={constructorStyles.ingredient}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={data.name}
                  price={data.price}
                  thumbnail={data.image}
                  handleClose={handleClose}
                />
              </div>
            );
          }
          return null;
        })}
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

      {totalAmount > 0 && (
        <div className={constructorStyles.cart}>
          <div className={constructorStyles.total}>
            <p className={constructorStyles.p}>{totalAmount}</p>
            <CurrencyIcon type="primary" />
          </div>

          {!loading && (
            <Button
              type="primary"
              size="medium"
              htmlType="button"
              onClick={checkOut}
            >
              Оформить заказ
            </Button>
          )}
          {loading && (
            <Button type="primary" size="medium" htmlType="button">
              Загрузка...
            </Button>
          )}
          <Modal onClick={closeModal} isOpen={isModalOpen} title={""}>
            <OrderDetails number={orderNumber} />
          </Modal>
        </div>
      )}
    </>
  );
}

export default BurgerConstructor;
