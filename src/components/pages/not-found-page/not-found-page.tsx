import { useNavigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import NotFoundStyle from './not-found-page.module.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className={NotFoundStyle.container}>
      <h1 className='text text_type_main-large mb-5'>Ошибка 404</h1>
      <p className='text text_type_main-medium mb-10'>Страница не найдена.</p>
      <p className='text text_type_main-default'>
        Перейти на страницу
        <Button
          onClick={() => navigate('/')}
          htmlType='button'
          size='medium'
          type='secondary'
        >
          конструктора бургера
        </Button>
      </p>
    </div>
  );
}
