import headerStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon,ProfileIcon   } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={headerStyles.header}>
      <nav>
        <ul className={headerStyles.menu}>
          <li className={headerStyles.item_active}>
            <BurgerIcon type="primary" />
            <a className={headerStyles.a} href='/'>Конструктор</a>
          </li>
          <li className={headerStyles.item} >
            <ListIcon type="primary" />
            <a className={headerStyles.a} href='/'>Лента заказов</a>
          </li>
        </ul>
      </nav>
      <Logo />
      <nav>
        <ul className={headerStyles.menu}>
        <li className={headerStyles.item}>
            <ProfileIcon type="primary" />
            <a className={headerStyles.a} href='/'>Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader;
