const { request, response } = require('express')
const api = require('../../api/match')


const matchController = {

    getChampTime: (request, response) =>{
        let {encryptedAccountId, championID,beginIndex} = request.body
        api.getChampTime(encryptedAccountId, championID, beginIndex)
        .then(({data}) => {
             response.status(200).json(data)
        })
        .catch((error) => {
             response.status(500).json(error)
        })
    },
    getMatch: (request, response) =>{
        let {matchId} = request.body
        api.getMatch(matchId)
        .then(({data}) => {
             response.status(200).json(data)
        })
        .catch((error) => {
             response.status(500).json(error)
        })
    }
}
module.exports = matchController
