import axios from 'axios'

const Api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params: {
        limit: 3,
        ts: 5,
        apikey: 'db9301c7b33e95a510d7c3e03bd43f67',
        hash: '1fc9f09d1bdd90f6b08fcf60869308ba',
    },
    headers: {
        'Content-Type': 'application/json'
    }
})
   
export default Api