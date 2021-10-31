import axios from 'axios'
const baseURL = "/api/units/"

export const getAllUnits = (start) => {
    return axios.get(baseURL, { params: { start: start } })
                .then(response => response.data)
}

export const getUnit = (id) => {
    return axios.get(baseURL+`${id}`)
                .then(response => response)
}

export const createUnit = (unit) => {
    return axios.post(baseURL, unit)
                .then(response => response)
}

export const deleteUnit = (unitId, user) => {
    return axios.delete(baseURL+`${unitId}`, {user:user.data})
    .then(response => response)
}

export const getNumUnits = () => {
    return axios.get(baseURL+"numUnits")
    .then(response => response)
}

export const submitReview = (review) => {
    return axios.post(baseURL+"review", review)
                .then(response => response.data)
}

export const deleteReview = (revId,unitId, user) => {
    return axios.delete(baseURL+`review/${unitId}/${revId}`, user)
    .then(response => response)
}

export const searchUnits = (query) => {
    return axios.get(baseURL+`search?any=${query}`)
    .then(response => response)
}
