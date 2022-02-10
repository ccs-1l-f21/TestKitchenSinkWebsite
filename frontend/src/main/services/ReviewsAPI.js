import axios from 'axios'

export async function getReviews(menuitem, diningCommonsCode){ 
    return axios.get(`/api/dining/getreviews?menuitem=${menuitem}&diningCommonsCode=${diningCommonsCode}`)
}

export async function getUserReview(menuitem, diningCommonsCode){ 
    return axios.get(`/api/dining/getuserreview?menuitem=${menuitem}&diningCommonsCode=${diningCommonsCode}`)
}