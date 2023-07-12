
import {FormEvent} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from '../../../hooks/useSelector';
import { useDispatch } from '../../../hooks/useDispatch';
import { useForm } from '../../../hooks/useForm';
import { requestResetCode } from '../../../services/actions/auth';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { getResetCode } from '../../../utils/state';
import PasswordStyles from './forgot-password-page.module.css';

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const hasResetCode = useSelector(getResetCode);
  const { data, handleDataChange } = useForm({ email: '' });
  
  const submitForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    dispatch(requestResetCode(data));
  };

  if (hasResetCode) {
    return <Navigate to={'/reset-password'} />;
  }

  return (
      <div className={PasswordStyles.container}>
        <form className={PasswordStyles.form} onSubmit={submitForgotPassword}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <Input
            type={'email'}
            placeholder={'Укажите e-mail'}
            onChange={handleDataChange}
            value={data.email !== undefined ? data.email : ''}
            name={'email'}
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Восстановить
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