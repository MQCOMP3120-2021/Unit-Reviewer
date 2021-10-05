import axios from 'axios'
const baseURL = "/api/units/"

const getAllUnits = () => {
    return axios.get(baseURL)
                .then(response => response.data)
}

export default {getAllUnits} 