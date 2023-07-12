

import { ProfileNav } from '../../profile-nav/profile-nav';
import OrdersPageStyle from './orders-page.module.css';

export const OrdersPage = () => {
  return (
      <div className={OrdersPageStyle.profile__container}>
        <ProfileNav
          navTip={'В этом разделе вы можете просмотреть свою историю заказов'}
        />
        <h1 className='text text_type_main-large'>История заказов</h1>
      </div>
  );
}

