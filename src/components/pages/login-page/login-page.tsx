
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../../hooks/useDispatch';
import { useForm } from '../../../hooks/useForm';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { loginUser } from '../../../services/actions/auth';
import LoginStyle from './login-page.module.css';
import { REGURL, FORGOTURL } from './../../../utils/constants';


export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const { data, handleDataChange } = useForm({
    email: '',
    password: ''
  });

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(data));
  };


  return (      
      <div className={LoginStyle.container}>
        <form className={LoginStyle.form} onSubmit={submitLogin}>
          <h1 className='text text_type_main-medium'>Вход</h1>

          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={handleDataChange}
            value={data.email !== undefined ? data.email : ''}
            name={'email'}
          />
          <PasswordInput
            onChange={handleDataChange}
            value={data.password !== undefined ? data.password : ''}
            name={'password'}
            icon='ShowIcon'
          />
          <Button htmlType='submit' type='primary' size='medium'>
            Войти
          </Button>
        </form>
        <p className='text text_type_main-default'>
          Вы&nbsp;— новый пользователь?
          <Button
            onClick={() => navigate(REGURL)}
            htmlType='button'
            type='secondary'
            size='medium'
            
          >
            Зарегистрироваться
          </Button>
        </p>
        <p className='text text_type_main-default'>
          Забыли пароль?
          <Button
            onClick={() => navigate(FORGOTURL)}
            htmlType='button'
            type='secondary'
            size='medium'

          >
            Восстановить пароль
          </Button>
        </p>
      </div>
  );
}

