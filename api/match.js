const api = require('./index')

module.exports = {

    getMatch: (matchId) => api.get(`/lol/match/v4/matches/${matchId}`),


    getChampMatch: (encryptedAccountId, championID, beginIndex) => api.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}?champion=${championID}&beginIndex=${beginIndex}`),

    getMatchList: (encryptedAccountId) => api.get(`/lol/match/v4/matchlists/by-account/${encryptedAccountId}`)
}