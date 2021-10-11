import axios from 'axios'
const baseURL = "/api/units/"

const getAllUnits = () => {
    return axios.get(baseURL)
                .then(response => response.data)
}

const createUnit = (unit) => {
    return axios.post(baseURL, unit)
                .then(response => response.data)
}

const submitReview = (review) => {
    return axios.post(baseURL+"review", review)
                .then(response => response.data)
}


export default {getAllUnits, createUnit, submitReview} 