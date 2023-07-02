import React, { useEffect, useCallback, FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../hooks/useSelector';
import { useDispatch } from '../../hooks/useDispatch';
import { authTokens } from '../../utils/auth';
import { getUserProfile, getAccessToken } from '../../services/actions/auth';


interface IProtectedRoute {
  element: ReactElement;
  showWhen: string;
}
  

export const ProtectedRouteElement: FC<IProtectedRoute> = ({ element, showWhen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { state: locationState } = useLocation();
  //@ts-ignore
  const user = useSelector((state) => state.auth.user);
  const { accessToken, refreshToken } = authTokens();


  const auth = useCallback(
    () => (accessToken || refreshToken) && user, [accessToken, refreshToken, user]
  );

  //  При монтировании проверяю токен, получаю данные //
  useEffect(() => {
    if ((accessToken || refreshToken) && !user) {
      if (!accessToken) {
        dispatch(getAccessToken(refreshToken));
      }
      dispatch(getUserProfile());
    }
  }, [accessToken, dispatch, refreshToken, user]);

  const render = () => {
    let elementToRender = element;
    switch (showWhen) {
      case 'loggedIn':
        if (!auth()) {
          elementToRender = (
            <Navigate to='/login' replace state={{ redirectTo: location }} />
          );
        }
        break;
      case 'notLoggedIn':
        if (auth()) {
          if (locationState) {
            const { redirectTo } = locationState;
            elementToRender = (
              <Navigate
                to={`${redirectTo.pathname}`}
                replace
                state={{ redirectTo: location }}
              />
            );
          } else {
            elementToRender = (<Navigate to='/' replace state={{ redirectTo: location }} />);
          }
        }
        break;
      default:
        break;
    }
    return elementToRender;
  };
  return render();
};


export default React.memo(ProtectedRouteElement);