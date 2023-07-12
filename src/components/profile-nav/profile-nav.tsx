//  Хуки для навигации и подсветки активного меню  //
import { memo, FC } from 'react';
import { useLocation, NavLink, matchPath } from 'react-router-dom';
import { useDispatch } from '../../hooks/useDispatch';
import { authTokens } from '../../utils/auth';
import { logoutUser } from '../../services/actions/auth';
import { 
  LOGINURL, 
  PROFILEURL, 
  PROFILEORDERSURL 
} from '../../utils/constants';
import ProfileNavSyle from './profile-nave.module.css';

interface IProfileNav {
  navTip: string;
}

export const ProfileNav:FC<IProfileNav> = ({ navTip }) => {
  const dispatch = useDispatch();
  const { refreshToken } = authTokens();  
  const location = useLocation();

  const activeProfileHome = matchPath(location.pathname, '/profile');
  const activeOrders = matchPath(location.pathname, '/profile/orders');
  
  const logout = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logoutUser(refreshToken));
  };

  return (      
    <div className={ProfileNavSyle.container}>
      <nav className={`mb-20 ${ProfileNavSyle.navbar}`}>
        <NavLink
          to={PROFILEURL}
          end
          className={`text text_type_main-medium pt-4 pb-4 ${ProfileNavSyle.link}`}
        >
          <p className={activeProfileHome ? 'text_color_primary' : 'text_color_inactive'}>
            Профиль
          </p>
        </NavLink>
        <NavLink
          to={PROFILEORDERSURL}
          className={`text text_type_main-medium pt-4 pb-4 ${ProfileNavSyle.link}`}
        >
          <p className={activeOrders ? 'text_color_primary' : 'text_color_inactive'}>
            История заказов
          </p>
        </NavLink>
        <NavLink
          to={LOGINURL}
          className={`text text_type_main-medium text_color_inactive pt-4 pb-4 ${ProfileNavSyle.link}`}
          onClick={logout}
        >
          Выход
        </NavLink>
      </nav>
      <p className='text text_type_main-default text_color_inactive'>{navTip}</p>
    </div>

  );
};

export default memo(ProfileNav);