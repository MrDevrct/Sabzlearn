import axios from "axios";

const apiRequest = axios.create({
    baseURL: 'http://localhost:7000'
})

export default apiRequest;