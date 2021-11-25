import axios from 'axios'

export async function getDiningHallItem(diningHall, item){ 
    return axios.get(`/reviews/item?hall=${diningHall}&item=${item}`)
}
