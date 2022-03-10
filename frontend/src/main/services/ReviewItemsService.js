import axios from 'axios'

export async function getDiningHallItem(diningHall, item, station){ 
    return axios.get(`/reviews/item?hall=${diningHall}&item=${item}&station=${station}`)
}
