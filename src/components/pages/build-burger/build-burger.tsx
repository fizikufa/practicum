import buildStyles from "./build-burger.module.css";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import {ingredients} from "../../../utils/data";
import {tabsData} from "../../../utils/data";

function BuildBurger() {
  return (
    <section className={buildStyles.row}>
      <div className={`{buildStyles.col_left} mr-10`}>
        <BurgerIngredients tabs={tabsData} dataArray={ingredients} />
      </div>
      <div className={buildStyles.col_right}>
        <BurgerConstructor
          dataArray={ingredients!}
          topBun={ingredients[0]}
          bottomBun={ingredients[ingredients.length - 1]}
        />
      </div>
    </section>
  );
}

export default BuildBurger;
