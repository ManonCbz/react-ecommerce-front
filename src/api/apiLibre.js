import axios from "axios"

const apiLibre = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export default apiLibre

apiLibre.interceptors.request.use((request) => {
    return request
})