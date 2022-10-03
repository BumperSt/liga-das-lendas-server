const {api} = require('./index')

module.exports = {
    getSummonerByLeague: ({league, tier, page}) => api.get(`https://br1.api.riotgames.com/lol/league-exp/v4/entries/${league}/${tier}/I?page=${page}`)
}