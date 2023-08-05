
import React, {useEffect, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../hooks/useDispatch';
import { useSelector } from '../../hooks/useSelector';
import { useLocation } from 'react-router';
import {WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../../utils/constants'
import { getItems, getOrdersLogged, getOrders } from '../../utils/state';
import { TOrder, TIngredient, TIngredientCount } from '../../utils/types';


import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import orderStyles from './order.module.css';

export const Order = () => {
  const { id } = useParams();
  const items:TIngredient[] = useSelector(getItems);
  const dispatch = useDispatch();
  const location = useLocation();
  const ordersList = useSelector(getOrders);
  const ordersListLogged = useSelector(getOrdersLogged);

  const orders: TOrder[] = location.pathname.startsWith('/feed')
    ? ordersList
    : ordersListLogged;

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
      return;
    };
  }, [dispatch]);

  const order = useMemo(
    () => orders?.find((order) => order._id === id) || null,
    [orders, id]
  );


  const orderIngredientInfo = useMemo(() => {  
    //  console.log(`items: ${items}, order: ${order}`)
    if (!order || !items?.length) return null;
    const date = new Date(order.createdAt);
    const ingredientsInfo = order.ingredients.reduce(
      (prev: TIngredientCount, i) => {
        if (!prev[i]) {
          const ingredient = items?.find((ingredientItem) => ingredientItem._id === i);
          if (ingredient) {
            prev[i] = {
              ...ingredient,
              count: 1,
            };
          }
        } else {
          prev[i].count += 1;
        }
        return prev;
      },
      {}
    );

  const total = Object.values(ingredientsInfo).reduce(
      (prev, i) => prev + i.price * i.count, 0
    );
    return {
      ...order,
      ingredientsInfo,
      date,
      total,
    };
  }, [order, items]);
  //  console.log(orderIngredientInfo);

  const getOrderStatus = () => {
    if (order !== null) {
      if (order.status === 'created') {
        return 'Создан';
      } else if (order.status === 'pending') {
        return 'Готовится';
      } else if (order.status === 'done') {
        return 'Выполнен';
      }
    }
  };

  const doneOrderColor = order
    ? order.status === 'done'
      ? {
          color: '#00cccc',
        }
      : undefined
    : undefined;

  
  return (
    <div className={orderStyles.container}>
      {order && (
        <>
          <p className={`text text_type_digits-default ${orderStyles.order_number}`}>
            {`#${order.number}`}
          </p>
          <p className='mt-10 text text_type_main-medium' style={doneOrderColor}>{order.name}</p>
          <p className='mt-3 text text_type_main-default'>{getOrderStatus()}</p>
          <p className='mt-15 text text_type_main-medium'>Состав:</p>
          <div className={`mt-6 pr-6 ${orderStyles.ingredients}`}>
            {orderIngredientInfo && Object.keys(orderIngredientInfo.ingredientsInfo).map((ingredient) => (
              <div className={orderStyles.ingredient} key={orderIngredientInfo.ingredientsInfo[ingredient]._id}>
                <div className={`mr-4 ${orderStyles.image_container}`}>
                  <div
                    className={orderStyles.ingredient_image}
                    style={{ backgroundImage: `url(${orderIngredientInfo.ingredientsInfo[ingredient].image})` }}
                  />
                </div>
                <div className={`mr-4 ${orderStyles.ingredient_name}`}>
                  {orderIngredientInfo.ingredientsInfo[ingredient].name}
                </div>
                <div className={orderStyles.ingredient_price}>
                  <p className='mr-2 text text_type_digits-default'>
                    {`${orderIngredientInfo.ingredientsInfo[ingredient].count} x ${orderIngredientInfo.ingredientsInfo[ingredient].price}`}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-10 mb-10 ${orderStyles.order_footer}`}>
            <FormattedDate
              date={new Date(order.createdAt)}
              className='text text_type_main-default text_color_inactive'
            />
            <div className={orderStyles.order_total}>
              <p className='text text_type_digits-default mr-2'>{orderIngredientInfo?.total}</p>
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </>
      )}
    </div>
  );
}