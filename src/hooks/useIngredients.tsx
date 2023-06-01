import { baseurl } from "../utils/constants";
import { useState, useEffect } from 'react';
import { TIngredient } from '../utils/types'

const useIngredients = () => {
    const [ingredients, setIngredients] = useState<TIngredient[]>([]);
    const url = baseurl+'/ingredients';

    useEffect(() => {
        try {
            getData(url);
        }
        catch (e) {
            console.log(e); 
        }
    });

    const getData = async (url:string) => {
        try {
            let response = await fetch(url);
            if (response.ok) {
                let json = await response.json();
                setIngredients(json.data as TIngredient[]);
            } else {
                alert("Ошибка HTTP: " + response.status);
            }
        }
        catch (e) {
            console.log(e);            
        }
    }
    return ingredients;
};

export default useIngredients;