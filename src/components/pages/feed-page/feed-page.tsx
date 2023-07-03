import  AppHeader  from '../../app-header/app-header';
import FeedStyles from './feed-page.module.css';

export const FeedPage = () => {
  return (
      <div className={FeedStyles.container}>
        <h1 className='text text_type_main-large'>Лента заказов</h1>
      </div>
  );
}