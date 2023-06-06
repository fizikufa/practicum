import AppHeader from "../../components/app-header/app-header";
import BuildBurger from "../../components/pages/build-burger/build-burger";
import useIngredients from "../../hooks/useIngredients";
import { useReducer } from "react";
import { BurgerContext, ingredientConstructorReducer,ingredientConstructorInitialState, EnumActions} from "../../context/burger-context";

function App() {
  const [burgerState, burgerDispatch] = useReducer(
    ingredientConstructorReducer,
    ingredientConstructorInitialState
  );
  
  const ingredients = useIngredients(burgerDispatch); 
 
  return (
    <div>
      <AppHeader />
      {ingredients.length && (
        <BurgerContext.Provider value={{ingredients, burgerState, burgerDispatch }}>
          <BuildBurger />
        </BurgerContext.Provider>
      )}
    </div>
  );
}

export default App;
