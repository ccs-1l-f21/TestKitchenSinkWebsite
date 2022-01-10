import axios from 'axios'

export async function getReviews(){ 
    return axios.get(`/api/dining/getreviews`)
}