import axios from "axios";

export async function getDiningCommons () {
    return axios.get(`/api/dining/commons?date=${currentDateISO()}`);
}
export async function getMeals(diningCommons){
    return axios.get(`/api/dining/meals?date=${currentDateISO()}&diningCommonsCode=${diningCommons}`);
}

export async function getItems(diningCommons, meal){
    return axios.get(`/api/dining/menu?date=${currentDateISO()}&diningCommonsCode=${diningCommons}&mealCode=${meal}`);
}

export function currentDateISO() {
    const result = new Date();
    const year = result.getFullYear();
    const month = result.getMonth() + 1;
    const date = result.getDate();
    const wholeDate = year + "-" + month + "-" + date;
    return wholeDate;
}