import { FC, useEffect } from 'react';

import { useDispatch } from '../../../hooks/useDispatch';

import { WS_CONNECTION_START_AUTH, WS_CONNECTION_CLOSE_AUTH } from '../../../utils/constants';
import { Order } from '../../order/order';

export const OrderPage:FC = () => {
  const dispatch = useDispatch();    

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE_AUTH });
      return;
    };
  }, [dispatch]);

  return (
    <div className='pt-10 pr-10 pb-10 pl-10'>
      <Order />
    </div>
  );
}