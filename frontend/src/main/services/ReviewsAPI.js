import axios from 'axios'

export async function getReviews(menuitem, diningCommonsCode, station){ 
    return axios.get(`/api/review/getreviews?menuitem=${menuitem}&diningCommonsCode=${diningCommonsCode}&station=${station}`)
}
