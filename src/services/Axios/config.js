import axios from "axios";

const apiRequest = axios.create({
    baseURL: 'https://sabzlearn-server.liara.run'
})

export default apiRequest;