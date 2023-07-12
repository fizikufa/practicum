import { useRef, memo } from 'react';
import { useDispatch } from '../../../hooks/useDispatch';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TIngredientInOrder } from '../../../utils/types';
import { MOVE_INGREDIENT } from '../../../utils/constants';
import ConstructorElementsStyle from './burger-constructor-element.module.css';

interface IConstructorElementProps {
  elementData: TIngredientInOrder;
  index: number;
  bunType?: 'top'|'bottom';
  isLocked: boolean;
  bunTypeName: string;
}

export function ConstructorElements({ elementData, bunType, isLocked, bunTypeName, index }:IConstructorElementProps) {

  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const onDeductIngredient = (elementDataUid: string) => {
    dispatch({ type: 'REMOVE_INGREDIENT', payload: elementDataUid });
  };

  const [, dropRef] = useDrop({
    accept: 'ingredientInConstructor',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      let typedItem;
      if (typeof item === 'object') {
        typedItem = item as { index: number, elementData: (TIngredient & { _uid: string }) };
      } else { 
        return;
      }

      if (typedItem.elementData._uid === elementData._uid) {
        return;
      }

      const dragIndex = typedItem.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current
        ? ref.current.getBoundingClientRect()
        : undefined;
      
      const hoverMiddleY = hoverBoundingRect ?
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y && hoverBoundingRect 
        ? clientOffset?.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: MOVE_INGREDIENT,
        payload: {
          whichIngredientDroppedUid: typedItem.elementData._uid,
          onWhichIngredientDroppedUid: elementData._uid,
        },
      });
    },
  });

  const [, dragRef] = useDrag({
    type: 'ingredientInConstructor',
    item: () => ({ elementData, index }),
  });

  dragRef(dropRef(ref));

  return (
    <div className={ConstructorElementsStyle.element} ref={ref}>
      <DragIcon type='primary' />
      <div className={ConstructorElementsStyle.elementShrink}>
        <ConstructorElement
          type={bunType}
          isLocked={isLocked}
          text={elementData.name + bunTypeName} 
          price={elementData.price}
          thumbnail={elementData.image}
          handleClose={ () => onDeductIngredient(elementData._uid)}
        />
      </div>      
    </div>
  );
}; 



export default memo(ConstructorElements);