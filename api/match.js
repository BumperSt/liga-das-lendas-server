const api = require('./index')

module.exports = {

    getMatch: (matchId) => api.get(`/lol/match/v4/matches/${matchId}`),


    getChampTime: (encryptedAccountId, championID, beginIndex) => api.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}?champion=${championID}&beginIndex=${beginIndex}`)
}