import AppHeader from "../../components/app-header/app-header";
import BuildBurger from "../../components/pages/build-burger/build-burger";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useIngredients from "../../hooks/useIngredients";

function App() {
  const ingredients = useIngredients();

  return (
    <>
      <AppHeader />
      {ingredients.length && (
        <DndProvider backend={HTML5Backend}>
          <BuildBurger />
        </DndProvider>
      )}
    </>
  );
}

export default App;
