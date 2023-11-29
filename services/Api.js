import axios from 'axios'


    const Api = axios.create({
    baseURL: 'https://gateway.marvel.com/v1/public/',
    params: {
        limit: 50,
        ts: 1,
        apikey: '96fd42dd1f3395eb9de325bb7c31bfd3',
        hash: '6a5e92df1a4547d14e2ee63cc72c101c',
    },
    headers: {
        'Content-Type': 'application/json'
    }
})

   
export default Api