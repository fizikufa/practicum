import buildStyles from "./build-burger.module.css";
import BurgerConstructor from "../../burger-constructor/burger-constructor";
import BurgerIngredients from "../../burger-ingredients/burger-ingredients";
import { TIngredient } from '../../../utils/types';



interface IBuildBurgerProps {
  ingredients: TIngredient[];
};


function BuildBurger({ingredients}:IBuildBurgerProps) {
  const bun = ingredients[0];
  const ingredientsMid: TIngredient[] = [ingredients[1],ingredients[2],ingredients[3],ingredients[4],ingredients[1]];
  
  const getIngredientCountInOrder=(ingredient:TIngredient)=>{
    if(bun._id===ingredient._id){
        return 1;
    }else{
       return ingredientsMid.filter(item => item === ingredient).length;
    }
  }

  return (
    <div className={buildStyles.row}>
      <div className={buildStyles.col_left}>
        <BurgerIngredients ingredients={ingredients} getIngredientCountInOrder={getIngredientCountInOrder} />
      </div>
      <div className={buildStyles.col_right}>
        <BurgerConstructor
          ingredients={ingredientsMid}
          bun={bun}
        />
      </div>
    </div>
  );
}

export default BuildBurger;
