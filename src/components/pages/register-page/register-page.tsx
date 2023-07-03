import { useDispatch } from '../../../hooks/useDispatch';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../../hooks/useForm';
import  AppHeader  from '../../app-header/app-header';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../../services/actions/auth';
import RegisterStyle from './register-page.module.css';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data, handleDataChange } = useForm({
    email: '',
    password: '',
    name: ''
  });


  const submitRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(data));
  };


  return (
      <div className={RegisterStyle.container}>
        <form className={RegisterStyle.form} onSubmit={submitRegisterUser}>
          <h1 className='text text_type_main-medium'>Регистрация</h1>

          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={handleDataChange}
            value={data.name !== undefined ? data.name : ''}
            name={'name'}
          />
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
            Зарегистрироваться
          </Button>
        </form>
        <p className='text text_type_main-default'>
          Уже зарегистрированы?
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
