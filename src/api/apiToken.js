import axios from "axios"

const apiToken = axios.create({
    baseURL: 'http://localhost:8080/api'
})

export default apiToken

apiToken.interceptors.request.use((request) => {

    request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
    return request
})