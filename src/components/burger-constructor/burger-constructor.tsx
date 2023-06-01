import { useEffect } from "react";
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
import React from "react";

interface IBurgerConstructorProps {
  ingredients: TIngredient[];
  bun: TIngredient;
}

function BurgerConstructor({ ingredients, bun }: IBurgerConstructorProps) {
  const [orderModalOpened, setOrderModal] = React.useState(false);

  const handleOpenOrderModal= () => {
    setOrderModal(true);
  };
  const handleCloseOrderModal= () => {
    setOrderModal(false);
  };

  useEffect(() => {
    const elements = Array.from(
      document.getElementsByClassName(
        "constructor-element"
      ) as HTMLCollectionOf<HTMLElement>
    );

    elements.map((element) => {
      return (element.style.width = "488px");
    });
  }, [ingredients]);

  const totalAmount =
    ingredients.reduce((amount, item) => amount + item.price, 0) + bun.price;

  return (
    <>
      <div className="mt-25">
        <div className={constructorStyles.ingredient_bun}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      </div>

      <div className={constructorStyles.inner_style}>
        {ingredients!.map((data, index) => {
          if (data.type !== "bun") {
            return (
              <div key={index} className={constructorStyles.ingredient}>
                <DragIcon type="primary" />

                <ConstructorElement
                  text={data.name}
                  price={data.price}
                  thumbnail={data.image}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className={constructorStyles.ingredient_bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>

      <div className={constructorStyles.cart}>
        <div className={constructorStyles.total}>
          <p className={constructorStyles.p}>{totalAmount}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" htmlType="button" onClick={handleOpenOrderModal}>
          Оформить заказ
        </Button>
       <Modal onClick={handleCloseOrderModal} isOpen={orderModalOpened} title={'Детали заказа'}>
          <OrderDetails />          
        </Modal>
      </div>
    </>
  );
}

export default BurgerConstructor;
