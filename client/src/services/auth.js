import axios from 'axios';

const baseURL = '/api/auth/';

export const register = ({ username, password }) => axios.post(`${baseURL}register`, { username, password })
  .then((response) => response);

export const login = ({ username, password }) => axios.post(`${baseURL}login`, { username, password })
  .then((response) => response);

export const getUser = () => axios
  .get(`${baseURL}me`)
  .then((response) => response)
  .catch((e) => console.log(e));

export const getUserReviews = (username) => axios
  .get(`${baseURL}${username}`)
  .then((response) => response)
  .catch((e) => console.log(e));

export const makeAdmin = (username) => {
  console.log(username);
  return axios
    .post(`${baseURL}makeAdmin`, { username })
    .then((response) => response);
};

export const revokeAdmin = (username) => {
  console.log(username);
  return axios
    .post(`${baseURL}revokeAdmin`, { username })
    .then((response) => response);
};

export const logout = () => axios.post(`${baseURL}logout`)
  .then(() => 'done')
  .catch((e) => console.log(e));
