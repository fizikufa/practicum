/* eslint-disable react-hooks/exhaustive-deps */
import { baseurl } from "../utils/constants";
import { useState, useEffect } from "react";
import { TIngredient } from "../utils/types";
import { EnumActions, IActions } from "../context/burger-context";

const useIngredients = (burgerDispatch: React.Dispatch<IActions>) => {
  const [ingredients, setIngredients] = useState<TIngredient[]>([]);
  const url = baseurl + "/ingredients";

  useEffect(() => {
    getData(url);
  }, []);

  const getData = async (url: string) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        setIngredients(json.data as TIngredient[]);
        burgerDispatch({
          type: EnumActions.add,
          payload: json.data[0],
        });
      } else {
        return Promise.reject(`Ошибка ${response.status}`);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return ingredients;
};

export default useIngredients;
