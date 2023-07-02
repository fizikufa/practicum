import buildStyles from "./burger-construction-page.module.css";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import AppHeader from "../../app-header/app-header";

export function BurgerConstructorPage() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={buildStyles.row}>
        <div className={buildStyles.col_left}>
          <BurgerIngredients />
        </div>
        <div className={buildStyles.col_right}>
          <BurgerConstructor />
        </div>
      </div>
    </DndProvider>
  );
}


