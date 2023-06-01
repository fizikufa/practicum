import AppHeader from "../../components/app-header/app-header";
import BuildBurger from "../../components/pages/build-burger/build-burger";
import useIngredients from '../../hooks/useIngredients';

function App() {
  const data = useIngredients();
  return (
    <div>
      <AppHeader />
      {data.length &&<BuildBurger ingredients={data}/>}
    </div>
  );
}


export default App;
