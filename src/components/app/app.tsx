import AppHeader from "../../components/app-header/app-header";
import BurgerConstructorPage from "../pages/burger-construction-page/burger-construction-page";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <BurgerConstructorPage />
        </DndProvider>
    </>
  );
}

export default App;
