import axios from 'axios'
const baseURL = "/api/auth/"

export const register = ({username, password}) => {
    return axios.post(baseURL+"register", {username, password})
                .then(response => response)
}

export const login = ({username, password}) => {
    return axios.post(baseURL+"login", {username, password})
                .then(response => response)
}

export const getUser = () => {
  return axios
    .get(baseURL + 'me')
    .then((response) => response)
    .catch((e) => console.log(e));
};

export const makeAdmin = (username) => {
  console.log(username)
  return axios
    .post(baseURL + 'makeAdmin', {username})
    .then(response => response)
};

export const revokeAdmin = (username) => {
  console.log(username)
  return axios
    .post(baseURL + 'revokeAdmin', {username})
    .then(response => response)
};

export const logout = () => {
  return axios.post(baseURL+"logout")
              .then(response => "done")
              .catch((e) => console.log(e));
}
