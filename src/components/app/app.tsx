import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  HOMEURL, 
  INGREDIENTSID, 
  FEEDURL,
  FEEDID,
  REGURL,
  LOGINURL,
  PROFILEURL,
  FORGOTURL,
  RESETPASSURL,
  PROFILEORDERSURL,
  ORDERSID, 
} from './../../utils/constants';
import { useDispatch } from './../../hooks/useDispatch';
import {
  BurgerConstructorPage as HomePage,
  IngredientPage,
  FeedPage,
  RegisterPage,
  LoginPage,
  ProfilePage,
  ForgotPasswordPage,
  ResetPasswordPage,
  OrdersPage,
  NotFoundPage,
  OrderPage
} from './../pages';
import { ProtectedRouteElement } from './../../components/protected-route/protected-route';
import { IngredientDetails } from './../../components/burger-ingredients/ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import  Modal  from './../../components/modal/modal';
import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import { Order } from './../../components/order/order';

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const background = location.state && location.state.background;

  return (
    <> <AppHeader />
    <Routes location = {background || location}>
      <Route path={HOMEURL} element={<HomePage />} />
      <Route path={REGURL} element={
        <ProtectedRouteElement
          element={<RegisterPage />}
          showWhen='notLoggedIn'
        />
      } />
      <Route path={LOGINURL} element={
        <ProtectedRouteElement
          element={<LoginPage />}
          showWhen='notLoggedIn'
        />
      } />

      <Route path={FEEDURL} element={<FeedPage />} />

      <Route path={FORGOTURL} element={
        <ProtectedRouteElement
          element={<ForgotPasswordPage />}
          showWhen='notLoggedIn'
        />
      } />

      <Route path={RESETPASSURL} element={
        <ProtectedRouteElement
          element={<ResetPasswordPage />}
          showWhen='notLoggedIn'
        />
      } />
      
      <Route path={PROFILEURL} element={
        <ProtectedRouteElement
          element={<ProfilePage />}
          showWhen='loggedIn'
        />
      } />

      <Route path={PROFILEORDERSURL} element={
        <ProtectedRouteElement
          element={<OrdersPage />}
          showWhen='loggedIn'
        />
      } />
      
      <Route path={ORDERSID} element={
        <ProtectedRouteElement
          element={<OrderPage />}
          showWhen='loggedIn'
        />
      } />

      <Route path={FEEDID} element={<OrderPage />} />

      <Route path={INGREDIENTSID} element={<IngredientPage />} />

      <Route path='*' element={<NotFoundPage />} />
    </Routes>

    {background && (
      <Routes>
        <Route
          path={INGREDIENTSID}
          element={
            <Modal onClick={(): void => navigate(-1)} title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path={FEEDID} element={
            <Modal onClick={() => navigate(-1)} title=''>
              <Order />
            </Modal>
          }
        />
        <Route
          path={ORDERSID} element={
            <Modal onClick={() => navigate(-1)} title=''>
              <Order />
            </Modal>
          }
        />
      </Routes>
    )}</>
  );
}

export default App;