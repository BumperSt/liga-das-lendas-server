const {api} = require('./index')

module.exports = {
    getSummonerInfo: (summonerName) => api.get(`/lol/summoner/v4/summoners/by-name/${summonerName}`),
    getSummonerByPuuid : (puuid) => api.get(` /lol/summoner/v4/summoners/by-puuid/${puuid}`),
    getSummonerLeague: (encryptedSummonerId) => api.get(`/lol/league/v4/entries/by-summoner/${encryptedSummonerId}`)
}