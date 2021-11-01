import axios from 'axios';

const baseURL = '/api/units/';

export const getAllUnits = (start) => axios.get(baseURL, { params: { start } })
  .then((response) => response.data);

export const getUnit = (id) => axios.get(`${baseURL}${id}`)
  .then((response) => response);

export const createUnit = (unit) => axios.post(baseURL, unit)
  .then((response) => response);

export const deleteUnit = (unitId, user) => axios.delete(`${baseURL}${unitId}`, { user: user.data })
  .then((response) => response);

export const getNumUnits = () => axios.get(`${baseURL}numUnits`)
  .then((response) => response);

export const submitReview = (review) => axios.post(`${baseURL}review`, review)
  .then((response) => response.data);

export const deleteReview = (revId, unitId, user) => axios.delete(`${baseURL}review/${unitId}/${revId}`, user)
  .then((response) => response);

export const searchUnits = (query) => axios.get(`${baseURL}search?any=${query}`)
  .then((response) => response);
