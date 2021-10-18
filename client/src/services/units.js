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

const deleteUnit = (unitId, user) => {
    return axios.delete(baseURL+`${unitId}`, {user:user.data})
    .then(response => response)
}

const submitReview = (review) => {
    return axios.post(baseURL+"review", review)
                .then(response => response.data)
}

const deleteReview = (revId,unitId, username) => {
    return axios.delete(baseURL+`review/${unitId}/${revId}`, {username})
    .then(response => response)
}


export default {getAllUnits, createUnit, deleteUnit, submitReview, deleteReview} 