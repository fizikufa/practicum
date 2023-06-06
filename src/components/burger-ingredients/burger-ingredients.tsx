import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState , useContext } from "react";
import BurgerIngredientItem from "./burger-ingredients-item/burger-ingredients-item";
import { BurgerContext } from "../../context/burger-context";

const tabsData = [
  {
    _id: 0,
    name: "Булки",
    type: "bun",
  },
  {
    _id: 1,
    name: "Соусы",
    type: "sauce",
  },
  {
    _id: 2,
    name: "Начинки",
    type: "main",
  },
];

function BurgerIngredient() {
  const [currentTab, setCurrentTab] = useState("bun");
  const { ingredients } = useContext(BurgerContext); 

  let ingredientLenght=ingredients.length;
  let bunLenght=ingredients.filter((ingredient) => ingredient.type === "bun").length;
  let sauceLenght=ingredients.filter((ingredient) => ingredient.type === "sauce").length;
  let mainLenght=ingredients.filter((ingredient) => ingredient.type === "main").length;

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    let height=event.currentTarget.offsetHeight;
    let k=height/ingredientLenght;

    if(event.currentTarget.scrollTop>k*(bunLenght+sauceLenght+mainLenght)){
      setCurrentTab("main");
      return;
    };
    if(event.currentTarget.scrollTop>k*bunLenght+sauceLenght){
      setCurrentTab("sauce");
      return;
    };
    setCurrentTab("bun");
  };

  return (
    <div>
      <p className={ingredientsStyles.head}>Соберите бургер</p>
      <div className={ingredientsStyles.tabs}>
        {tabsData!.map((tab) => (
          <Tab
            key={tab._id}
            value={tab.type}
            active={currentTab === tab.type}
            onClick={setCurrentTab}
          >
            {tab.name}
          </Tab>
        ))}
      </div>

      {ingredients && (
        <ul className={ingredientsStyles.components} onScroll={handleScroll}>
          {tabsData!.map((tab) => (
            <section key={tab._id}>
              <p className={ingredientsStyles.tab_head}>{tab.name}</p>
              <div className={ingredientsStyles.item_container}>
                {ingredients
                  .filter((ingredient) => ingredient.type === tab.type)
                  .map((ingredient) => (
                    <BurgerIngredientItem
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
                  ))}
              </div>
            </section>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BurgerIngredient;
