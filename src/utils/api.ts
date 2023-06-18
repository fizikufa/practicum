import { baseurl } from "../utils/constants";

export function loadIngredients(setIngredients:React.Dispatch<React.SetStateAction<never[]>>) {
    const url = `${baseurl}/ingredients`;
    return getData('GET', url);
}

export function createOrder(body:any) {
    const url = `${baseurl}/orders`;
    return getData('POST', url, body);
}

function getData(method:string, url:string, body?:any) {    
    return fetch(url, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then((response) => {
            if (response.ok) return response.json();
            else return Promise.reject(`Ошибка ${response.status}`);
        })
        .then((responseData) => {
            return responseData;
        })
        .catch((error) => { console.warn(error); })
}
