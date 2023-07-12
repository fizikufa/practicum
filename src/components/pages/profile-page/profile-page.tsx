
import { useState } from 'react';
import { useDispatch } from '../../../hooks/useDispatch';
import { useSelector } from '../../../hooks/useSelector';
import { useForm } from '../../../hooks/useForm';
import { ProfileNav } from '../../profile-nav/profile-nav';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserProfile } from '../../../services/actions/auth';
import ProfileStyle from './profile-page.module.css';

export const ProfilePage = () => {

  const dispatch = useDispatch(); 
  const user = useSelector((state) => state.auth.user);
  let passwordValue = '******';
  const [isChanged, setIsChanged] = useState(false);

  const { data, setData } = useForm({
    email: user?.email,
    password: passwordValue,
    name: user?.name,
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setIsChanged(true);
  };

  const submitForm = () => {
    dispatch(
      updateUserProfile({
        email: data.email,
        name: data.name,
        password: data.password !== passwordValue ? data.password : undefined
      })
    );
    setIsChanged(false);
  };

  const cancelSubmit = () => {
    setData({
      email: user?.email,
      name: user?.name,
      password: passwordValue,
    });
    setIsChanged(false);
  };


  return (
      <div className={ProfileStyle.profile__container}>
        <ProfileNav
          navTip={'В этом разделе вы можете изменить свои персональные данные'}
        />
        <div className='ml-15'>
          <form className={ProfileStyle.profile__form}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              value={data.name !== undefined ? data.name : ''}
              name={'name'}
              icon='EditIcon'
            />
            <Input
              type={'email'}
              placeholder={'Логин'}
              onChange={onChange}
              value={data.email !== undefined ? data.email : ''}
              name={'email'}
              icon='EditIcon'
            />
            <PasswordInput
              onChange={onChange}
              value={data.password !== undefined ? data.password : ''}
              name={'password'}
              icon='EditIcon'
            />
            {isChanged && (
              <div className={ProfileStyle.profile__button_container}>
                <Button
                  type='secondary'
                  size='medium'
                  htmlType='button'
                  onClick={cancelSubmit}
                >
                  Отмена
                </Button>
                <Button
                  type='primary'
                  size='medium'
                  htmlType='submit'
                  onClick={submitForm}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
  );
}
