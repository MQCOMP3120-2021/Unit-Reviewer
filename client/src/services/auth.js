import axios from 'axios'
const baseURL = "/api/auth/"

const register = ({username, password}) => {
    return axios.post(baseURL+"register", {username, password})
                .then(response => response)
}

const login = ({username, password}) => {
    return axios.post(baseURL+"login", {username, password})
                .then(response => response)
}

export default {register, login} 