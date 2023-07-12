import ingredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useMemo } from "react";
import BurgerIngredientItem from "./burger-ingredients-item/burger-ingredients-item";
import { TIngredient, RootState } from "../../utils/types";
import { useSelector } from "react-redux";

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

  const ingredients = useSelector<RootState, TIngredient[]>(
    (state) => state.ingredients.items
  );

  const ingredientLength = ingredients.length;

  const bunLength = useMemo<number>(
    () =>
      ingredients.filter((ingredient: TIngredient) => ingredient.type === "bun")
        .length,
    [ingredients]
  );
  const sauceLength = useMemo<number>(
    () =>
      ingredients.filter(
        (ingredient: TIngredient) => ingredient.type === "sauce"
      ).length,
    [ingredients]
  );
  const mainLength = useMemo<number>(
    () =>
      ingredients.filter(
        (ingredient: TIngredient) => ingredient.type === "main"
      ).length,
    [ingredients]
  );

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const height = event.currentTarget.offsetHeight;
    const k = height / ingredientLength;

    if (
      event.currentTarget.scrollTop >
      k * (bunLength + sauceLength + mainLength)
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

  const setTab = (type: string) => {
    setCurrentTab(type);
    tabsData
      .find((tab) => tab.type === type)
      ?.ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
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
        <div className={ingredientsStyles.components} onScroll={handleScroll}>
          {tabsData!.map((tab) => (
            <section key={tab._id} ref={tab.ref}>
              <p className={ingredientsStyles.tab_head}>{tab.name}</p>
              <div
                className={ingredientsStyles.item_container}
                id="typeContainer"
              >
                {ingredients
                  .filter(
                    (ingredient: TIngredient) => ingredient.type === tab.type
                  )
                  .map((ingredient: TIngredient) => (
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
