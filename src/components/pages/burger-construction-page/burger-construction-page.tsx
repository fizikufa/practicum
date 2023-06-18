import buildStyles from "./burger-construction-page.module.css";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";

function BurgerConstructorPage() {
  return (
    <div className={buildStyles.row}>
      <div className={buildStyles.col_left}>
        <BurgerIngredients/>
      </div>
      <div className={buildStyles.col_right}>
        <BurgerConstructor/>
      </div>
    </div>
  );
}

export default BurgerConstructorPage;
