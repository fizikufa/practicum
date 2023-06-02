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

interface IBurgerConstructorProps {
  ingredients: TIngredient[];
  bun: TIngredient;
}

function BurgerConstructor({ ingredients, bun }: IBurgerConstructorProps) {
  const { isModalOpen, openModal, closeModal } = useModal();

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
        <Button type="primary" size="large" htmlType="button" onClick={openModal}>
          Оформить заказ
        </Button>
        <Modal onClick={closeModal} isOpen={isModalOpen} title={''}>
          <OrderDetails />          
        </Modal>        
      </div>
    </>
  );
}

export default BurgerConstructor;
