import { useEffect } from "react";
import constructorStyles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

///Временно, потом переделаю на использование типа
const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

const bottomBun = dataPropTypes;

const topBun = dataPropTypes;

const propTypes = {
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
  dataArray: PropTypes.arrayOf(dataPropTypes.isRequired),
  topBun,
  bottomBun,
};

BurgerConstructor.propTypes = propTypes;

type burgerConstructorPropTypes = PropTypes.InferProps<typeof propTypes>;

function BurgerConstructor(props: burgerConstructorPropTypes) {
  useEffect(() => {
    const elements = Array.from(
      document.getElementsByClassName(
        "constructor-element"
      ) as HTMLCollectionOf<HTMLElement>
    );

    elements.map((element) => {
      return (element.style.width = "488px");
    });
  }, [props.dataArray]);

  return (
    <>
      <div className="mt-25">
        <div className={`${constructorStyles.ingredient} ml-8 mr-8 mb-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${props.dataArray![0].name} (верх)`}
            price={props.dataArray![0].price}
            thumbnail={props.dataArray![0].image}
          />
        </div>
      </div>

      <div className={`${constructorStyles.inner_style} custom-scroll`}>
        {props.dataArray!.map((data, index) => {
          if (data.type !== "bun") {
            return (
              <div
                key={index}
                className={`${constructorStyles.ingredient} ml-4 mr-6 mb-4`}
              >
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

      <div className={`${constructorStyles.ingredient} ml-8 mr-8 mt-4`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${props.dataArray![0].name} (верх)`}
          price={props.dataArray![0].price}
          thumbnail={props.dataArray![0].image}
        />
      </div>

      <div className={`${constructorStyles.cart} mt-10`}>
        <div className={`${constructorStyles.total} mr-10`}>
          <p className="text text_type_digits-medium">500</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </>
  );
}

export default BurgerConstructor;
