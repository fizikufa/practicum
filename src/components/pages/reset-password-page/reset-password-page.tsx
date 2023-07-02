import { useDispatch } from '../../../hooks/useDispatch';
import { useSelector } from '../../../hooks/useSelector';
import { useForm } from '../../../hooks/useForm';

import { Navigate, useNavigate } from 'react-router-dom';
import { changePassword } from '../../../services/actions/auth';
import  AppHeader  from '../../app-header/app-header';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { getResetCode } from '../../../utils/state'
import PasswordStyles from './reset-password-page.module.css';

export const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hasResetCode = useSelector(getResetCode);
  const { data, handleDataChange,  } = useForm({ password: '', token: '' });

  const submitForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(changePassword(data));
    navigate('/login');
  };

  if (!hasResetCode) {
    return <Navigate to={'/forgot-password'} />;
  }


  return (
      <div className={PasswordStyles.container}>
        <form className={PasswordStyles.form} onSubmit={submitForgotPassword}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <PasswordInput
            placeholder={'Введите новый пароль'}
            onChange={handleDataChange}
            value={data.password !== undefined ? data.password : ''}
            name={'password'}
            icon='ShowIcon'
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={handleDataChange}
            value={data.token !== undefined ? data.token : ''}
            name={'token'}
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Сохранить
          </Button>
        </form>
        <p className='text text_type_main-default'>
          Вспомнили пароль?
          <Button
            onClick={() => navigate('/login')}
            htmlType='button'
            type='secondary'
            size='medium'
          >
            Войти
          </Button>
        </p>
      </div>
  );
}

