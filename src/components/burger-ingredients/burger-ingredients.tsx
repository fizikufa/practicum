import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, useRef } from "react";
import BurgerIngredientItem from "./burger-ingredients-item/burger-ingredients-item";
import { getIngredients } from "../../services/actions/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { Ingredient, State } from "../../utils/types";

function BurgerIngredient() {
  const tabsData = [
    {
      _id: 0,
      name: "Булки",
      type: "bun",
      ref: useRef<HTMLDivElement>(null),
    },
    {
      _id: 1,
      name: "Соусы",
      type: "sauce",
      ref: useRef<HTMLDivElement>(null),
    },
    {
      _id: 2,
      name: "Начинки",
      type: "main",
      ref: useRef<HTMLDivElement>(null),
    },
  ];

  const [currentTab, setCurrentTab] = useState("bun");

  const ingredients = useSelector(
    (state: State) => state.ingredients.ingredients
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    //Пока не осилил ts потом приведу в порядок
    dispatch(getIngredients());
  }, []);

  let ingredientLength = ingredients.length;
  let bunLength = ingredients.filter(
    (ingredient: Ingredient) => ingredient.type === "bun"
  ).length;
  let sauceLength = ingredients.filter(
    (ingredient: Ingredient) => ingredient.type === "sauce"
  ).length;
  let mainLength = ingredients.filter(
    (ingredient: Ingredient) => ingredient.type === "main"
  ).length;

  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    let height = event.currentTarget.offsetHeight;
    let k = height / ingredientLength;

    if (
      event.currentTarget.scrollTop >
      k * (bunLength +sauceLength + mainLength)
    ) {
      setCurrentTab("main");
      return;
    }
    if (event.currentTarget.scrollTop > k * bunLength + sauceLength) {
      setCurrentTab("sauce");
      return;
    }
    setCurrentTab("bun");
  };


  ////Почемуто не работает сдвиг скрола, разберусь позже
  const setTab = (name: string) => {
      setCurrentTab(name);      
      mainRef.current?.scrollTo({
        top: tabsData.find(tab => tab.name === name)?.ref.current?.offsetTop,
        left: 0,
        behavior: "smooth",
      });
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
            onClick={setTab}
          >
            {tab.name}
          </Tab>
        ))}
      </div>

      {ingredients && (
        <div
          className={ingredientsStyles.components}
          onScroll={handleScroll}
          ref={mainRef}
        >
          {tabsData!.map((tab) => (
            <section key={tab._id} ref={tab.ref}>
              <p className={ingredientsStyles.tab_head}>{tab.name}</p>
              <div
                className={ingredientsStyles.item_container}
                id="typeContainer"
              >
                {ingredients
                  .filter(
                    (ingredient: Ingredient) => ingredient.type === tab.type
                  )
                  .map((ingredient: Ingredient) => (
                    <BurgerIngredientItem
                      key={ingredient._id}
                      ingredient={ingredient}
                    />
                  ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default BurgerIngredient;
