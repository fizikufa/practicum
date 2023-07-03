import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  LOGINURL, 
  REGURL, 
  PROFILEURL, 
  HOMEURL, 
  FEEDURL, 
  RESETPASSURL, 
  INGREDIENTSID, 
  PROFILEORDERSURL, 
  FORGOTURL 
} from './../../utils/constants';
import { useDispatch } from './../../hooks/useDispatch';
import {
  RegisterPage,
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  BurgerConstructorPage,
  ProfilePage,
  IngredientPage,
  OrdersPage,
  FeedPage,
  NotFoundPage,
} from './../pages';
import { ProtectedRouteElement } from './../../components/protected-route/protected-route';
import { IngredientDetails } from './../../components/burger-ingredients/ingredient-details/ingredient-details';
import { getIngredients } from '../../services/actions/ingredients';
import  Modal  from './../../components/modal/modal';
import { useEffect } from 'react';
import AppHeader from '../app-header/app-header';

const App = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isBackground = location.state && location.state.ingredientModal;

  return (
    <><AppHeader /><Routes>
      <Route path={HOMEURL} element={<BurgerConstructorPage />} />
      <Route path={REGURL} element={<ProtectedRouteElement
        element={<RegisterPage />}
        showWhen='notLoggedIn' />} />
      <Route path={LOGINURL} element={<ProtectedRouteElement
        element={<LoginPage />}
        showWhen='notLoggedIn' />} />
      <Route path={FORGOTURL} element={<ProtectedRouteElement
        element={<ForgotPasswordPage />}
        showWhen='notLoggedIn' />} />

      <Route path={RESETPASSURL} element={<ProtectedRouteElement
        element={<ResetPasswordPage />}
        showWhen='notLoggedIn' />} />

      <Route path={PROFILEURL} element={<ProtectedRouteElement
        element={<ProfilePage />}
        showWhen='loggedIn' />} />
      <Route path={PROFILEORDERSURL} element={<ProtectedRouteElement
        element={<OrdersPage />}
        showWhen='loggedIn' />} />

      <Route path={FEEDURL} element={<FeedPage />} />
      {isBackground && (
        <Route path={INGREDIENTSID} element={<Modal onClick={() => navigate(-1)} title='Детали ингредиента'>
          <IngredientDetails />
        </Modal>} />
      )}
      <Route path={INGREDIENTSID} element={<IngredientPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes></>
  );
}

export default App;