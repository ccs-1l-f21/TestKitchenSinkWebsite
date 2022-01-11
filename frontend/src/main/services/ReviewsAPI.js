import axios from 'axios'

export async function getReviews(menuitem, diningCommonsCode){ 
    return axios.get(`/api/dining/getreviews?menuitem=${menuitem}&diningCommonsCode=${diningCommonsCode}`)
}