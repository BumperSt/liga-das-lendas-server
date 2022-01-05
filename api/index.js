const axios = require('axios')

const api = axios.create({
    baseURL:'https://br1.api.riotgames.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    params: {
        api_key: process.env.API_KEY
    },
})
const historyApi = axios.create({
    baseURL:'https://americas.api.riotgames.com',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    params: {
        api_key: process.env.API_KEY
    },
})


module.exports = {api, historyApi}