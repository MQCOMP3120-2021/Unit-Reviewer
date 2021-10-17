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

const getUser = () => {
  return axios
    .get(baseURL + 'me')
    .then((response) => response)
    .catch((e) => console.log(e));
};

const logout = () => {
  return axios.post(baseURL+"logout")
              .then(response => "done")
              .catch((e) => console.log(e));
}

export default {register, login, getUser, logout} 