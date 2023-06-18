import React from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT } from "../../../services/actions/order";
import Style from "./burger-constructor-element.module.css";
import { Ingredient } from "../../../utils/types";


interface IBurgerConstructorElementProps {
  elementData: Ingredient;
  bunType: "bottom" | "top" | undefined;
  isLocked: boolean;
  bunTypeName: string;
  index: number;
}

function BurgerConstructorElement({
  elementData,
  bunType,
  isLocked,
  bunTypeName,
  index,
}: IBurgerConstructorElementProps) {
  const dispatch = useDispatch();
  const ref = React.useRef(null);

  const onDeductIngredient = (elementDataUid: string) => {
    dispatch({ type: "REMOVE_INGREDIENT", payload: elementDataUid });
  };

  const [, dropRef] = useDrop({
    accept: "BurgerConstructorElement",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      //Пока не осилил ts потом приведу в порядок
      if (item.elementData._uid === elementData._uid) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      //Пока не осилил ts потом приведу в порядок
      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          //Пока не осилил ts потом приведу в порядок
          ref.current.getBoundingClientRect()
        : undefined;
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      //Пока не осилил ts потом приведу в порядок
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: MOVE_INGREDIENT,
        payload: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          //Пока не осилил ts потом приведу в порядок
          whichIngredientDroppedUid: item.elementData._uid,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          //Пока не осилил ts потом приведу в порядок
          onWhichIngredientDroppedUid: elementData._uid,
        },
      });
    },
  });

  const [, dragRef] = useDrag({   
    type: "BurgerConstructorElement",
    item: () => ({ elementData, index }),
  });

  dragRef(dropRef(ref));


  return (
    <div className={Style.element} ref={ref}>
      <DragIcon type="primary" />
      <div className={Style.elementShrink}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={elementData.name + bunTypeName}
          price={elementData.price}
          thumbnail={elementData.image}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          //Пока не осилил ts потом приведу в порядок
          handleClose={() => onDeductIngredient(elementData._uid)}
        />
      </div>
    </div>
  );
}

export default BurgerConstructorElement;