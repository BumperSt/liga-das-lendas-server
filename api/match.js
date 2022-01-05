const {historyApi} = require('./index')

module.exports = {

    getMatch: (matchId) => historyApi.get(`/lol/match/v5/matches/${matchId}`),

    getChampMatch: (puuid, championID, beginIndex) => historyApi.get(`/lol/match/v5/matches/by-puuid/${puuid}?champion=${championID}&beginIndex=${beginIndex}`),

    getMatchList: (puuid) => historyApi.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids`)
}
