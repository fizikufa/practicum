/* eslint-disable react-hooks/exhaustive-deps */
import { baseurl } from "../utils/constants";
import { useState, useEffect, useContext } from 'react';
import { TIngredient } from '../utils/types'

const useIngredients = () => {
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);
    const url = baseurl+'/ingredients';

    useEffect(() => {    
            getData(url);
    },[]);

    const getData = async (url:string) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();               
                setIngredients(json.data as TIngredient[]);
            } else {
                return Promise.reject(`Ошибка ${response.status}`);
            }
        }
        catch (e) {
            console.log(e);            
        }
    }
    return ingredients;
};

export default useIngredients;