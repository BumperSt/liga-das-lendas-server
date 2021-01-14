const api = require('./index')

module.exports = {
    getChampsRotation: () => api.get('/lol/platform/v3/champion-rotations'),

    getChampMaestry: (encryptedSummonerId) => api.get(`/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}`)
}