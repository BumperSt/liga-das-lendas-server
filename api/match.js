const {historyApi} = require('./index')

module.exports = {

    getMatch: (matchId) => historyApi.get(`/lol/match/v5/matches/${matchId}`),

    getChampMatch: (puuid, championID, beginIndex) => historyApi.get(`/lol/match/v5/matches/by-puuid/${puuid}?champion=${championID}&beginIndex=${beginIndex}`),

    getMatchList: (puuid,matchType, startIndex) => historyApi.get(`/lol/match/v5/matches/by-puuid/${puuid}/ids?type=${matchType}&start=${startIndex}&count=10`)
}
