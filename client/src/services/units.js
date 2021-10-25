import axios from 'axios'
const baseURL = "/api/units/"

const getAllUnits = (start) => {
    return axios.get(baseURL, { params: { start: start } })
                .then(response => response.data)
}

const getUnit = (id) => {
    return axios.get(baseURL+`${id}`)
                .then(response => response)
}

const createUnit = (unit) => {
    return axios.post(baseURL, unit)
                .then(response => response)
}

const deleteUnit = (unitId, user) => {
    return axios.delete(baseURL+`${unitId}`, {user:user.data})
    .then(response => response)
}

const getNumUnits = () => {
    return axios.get(baseURL+"numUnits")
    .then(response => response)
}

const submitReview = (review) => {
    return axios.post(baseURL+"review", review)
                .then(response => response.data)
}

const deleteReview = (revId,unitId, user) => {
    return axios.delete(baseURL+`review/${unitId}/${revId}`, user)
    .then(response => response)
}


export default {getAllUnits, getUnit, createUnit, deleteUnit, getNumUnits, submitReview, deleteReview} 